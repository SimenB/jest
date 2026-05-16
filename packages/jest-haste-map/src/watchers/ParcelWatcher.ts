/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {EventEmitter} from 'node:events';
import * as path from 'node:path';
import * as parcelWatcher from '@parcel/watcher';
import anymatch from 'anymatch';
import * as fs from 'graceful-fs';
import picomatch from 'picomatch';
import type {IWatcher, WatcherOptions} from './types';

function pickBackend(useWatchman: boolean): parcelWatcher.BackendType {
  if (useWatchman) {
    return 'watchman';
  }
  switch (process.platform) {
    case 'darwin':
      return 'fs-events';
    case 'linux':
      return 'inotify';
    case 'win32':
      return 'windows';
    default:
      return 'brute-force';
  }
}

const CHANGE_EVENT = 'change';
const DELETE_EVENT = 'delete';
const ADD_EVENT = 'add';
const ALL_EVENT = 'all';

// VCS dirs are always present in opts.ignored (added by HasteMap constructor).
// Pass them explicitly to parcel so it doesn't watch inside them.
const VCS_IGNORE_GLOBS = ['**/.git', '**/.hg', '**/.sl'];

function isFileIncluded(
  globs: ReadonlyArray<string>,
  dot: boolean,
  doIgnore: (path: string) => boolean,
  relativePath: string,
): boolean {
  if (doIgnore(relativePath)) {
    return false;
  }
  return globs.length > 0
    ? globs.some(glob => picomatch(glob, {dot})(relativePath))
    : dot || picomatch('**/*')(relativePath);
}

export class ParcelWatcher extends EventEmitter implements IWatcher {
  readonly root: string;
  private readonly _dot: boolean;
  private readonly _glob: ReadonlyArray<string>;
  private readonly _doIgnore: (path: string) => boolean;
  private readonly _backend: parcelWatcher.BackendType;
  private readonly _snapshotPath: string;
  private _subscription: parcelWatcher.AsyncSubscription | null = null;

  static isSupported(): boolean {
    return true;
  }

  constructor(root: string, opts: WatcherOptions) {
    super();
    this.root = path.resolve(root);
    this._dot = opts.dot;
    this._glob = opts.glob;
    this._doIgnore = opts.ignored ? anymatch(opts.ignored) : () => false;
    this._backend = pickBackend(opts.useWatchman);
    this._snapshotPath = opts.snapshotPath ?? '';

    setImmediate(() => this._start());
  }

  private async _start(): Promise<void> {
    const parcelOpts: parcelWatcher.Options = {
      backend: this._backend,
      ignore: VCS_IGNORE_GLOBS,
    };

    try {
      if (fs.existsSync(this._snapshotPath)) {
        const events = await parcelWatcher.getEventsSince(
          this.root,
          this._snapshotPath,
          parcelOpts,
        );
        if (events.length > 0) {
          this._handleEvents(null, events);
        }
      }

      this._subscription = await parcelWatcher.subscribe(
        this.root,
        this._handleEvents,
        parcelOpts,
      );

      await parcelWatcher.writeSnapshot(
        this.root,
        this._snapshotPath,
        parcelOpts,
      );

      this.emit('ready');
    } catch (error) {
      this.emit('error', error);
    }
  }

  private _handleEvents = (
    err: Error | null,
    events: Array<parcelWatcher.Event>,
  ) => {
    if (err) {
      this.emit('error', err);
      return;
    }

    for (const event of events) {
      const absPath = event.path;
      const relPath = path.relative(this.root, absPath);

      if (!isFileIncluded(this._glob, this._dot, this._doIgnore, relPath)) {
        continue;
      }

      if (event.type === 'delete') {
        this.emit(DELETE_EVENT, relPath, this.root);
        this.emit(ALL_EVENT, DELETE_EVENT, relPath, this.root);
      } else {
        const type = event.type === 'create' ? ADD_EVENT : CHANGE_EVENT;
        fs.lstat(absPath, (error, stat) => {
          if (error) return;
          this.emit(type, relPath, this.root, stat);
          this.emit(ALL_EVENT, type, relPath, this.root, stat);
        });
      }
    }
  };

  async close(): Promise<void> {
    await this._subscription?.unsubscribe();
    this._subscription = null;
    const parcelOpts: parcelWatcher.Options = {
      backend: this._backend,
      ignore: VCS_IGNORE_GLOBS,
    };
    await parcelWatcher
      .writeSnapshot(this.root, this._snapshotPath, parcelOpts)
      .catch(() => undefined);
    this.removeAllListeners();
  }
}
