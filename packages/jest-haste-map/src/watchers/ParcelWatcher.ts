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
import type {HasteRegExp} from '../types';
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

const VCS_IGNORE_GLOBS = ['**/.git', '**/.hg', '**/.sl'];

// Extract simple directory names from a HasteRegExp and convert to globs so
// parcel can skip them at the OS-watch level (e.g. node_modules).
// Complex patterns that can't be expressed as globs are handled defensively
// by _handleEvents via _doIgnore.
function ignoredToGlobs(ignored: HasteRegExp | undefined): Array<string> {
  if (!(ignored instanceof RegExp)) {
    return VCS_IGNORE_GLOBS;
  }
  const extra = ignored.source
    .split('|')
    .map(s =>
      s
        .replaceAll(/[()[\]{}^$*+?]/g, '')
        .replaceAll('\\.', '.')
        .trim(),
    )
    .filter(name => /^[\w.-]+$/.test(name))
    .map(name => `**/${name}`);
  return [...new Set([...VCS_IGNORE_GLOBS, ...extra])];
}

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
  private readonly _ignoreGlobs: Array<string>;
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
    this._ignoreGlobs = ignoredToGlobs(opts.ignored);
    this._snapshotPath = opts.snapshotPath ?? '';

    setImmediate(() => this._start());
  }

  private async _start(): Promise<void> {
    const parcelOpts: parcelWatcher.Options = {
      backend: this._backend,
      ignore: this._ignoreGlobs,
    };

    try {
      let replayEvents: Array<parcelWatcher.Event> = [];
      if (this._snapshotPath && fs.existsSync(this._snapshotPath)) {
        replayEvents = await parcelWatcher.getEventsSince(
          this.root,
          this._snapshotPath,
          parcelOpts,
        );
      }

      this._subscription = await parcelWatcher.subscribe(
        this.root,
        this._handleEvents,
        parcelOpts,
      );

      if (this._snapshotPath) {
        await parcelWatcher.writeSnapshot(
          this.root,
          this._snapshotPath,
          parcelOpts,
        );
      }

      this.emit('ready');

      if (replayEvents.length > 0) {
        setImmediate(() => this._handleEvents(null, replayEvents));
      }
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
    if (this._snapshotPath) {
      try {
        await parcelWatcher.writeSnapshot(this.root, this._snapshotPath, {
          backend: this._backend,
          ignore: this._ignoreGlobs,
        });
      } catch {
        // best-effort
      }
    }
    this.removeAllListeners();
  }
}
