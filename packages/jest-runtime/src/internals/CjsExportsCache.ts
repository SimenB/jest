/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as path from 'node:path';
import {parse as parseCjs} from 'cjs-module-lexer';
import type {FileCache} from './FileCache';
import type {Resolution} from './Resolution';
import type {TransformCache} from './TransformCache';

interface CjsExportsCacheOptions {
  resolution: Resolution;
  fileCache: FileCache;
  transformCache: TransformCache;
  loadNativeAddon: (modulePath: string) => unknown;
  loadCoreReexport: (fromPath: string, coreName: string) => unknown;
}

// Computes (and caches) the named exports of a CJS module by static analysis
// with cjs-module-lexer, recursively walking `module.exports = require(...)`
// re-exports. Native (`.node`) addons and core-module re-exports can't be
// statically analysed, so they are loaded via the injected callbacks and the
// real export keys are read off the resulting object.
export class CjsExportsCache {
  private readonly cache = new Map<string, Set<string>>();
  private readonly resolution: Resolution;
  private readonly fileCache: FileCache;
  private readonly transformCache: TransformCache;
  private readonly loadNativeAddon: (modulePath: string) => unknown;
  private readonly loadCoreReexport: (
    fromPath: string,
    coreName: string,
  ) => unknown;

  constructor(options: CjsExportsCacheOptions) {
    this.resolution = options.resolution;
    this.fileCache = options.fileCache;
    this.transformCache = options.transformCache;
    this.loadNativeAddon = options.loadNativeAddon;
    this.loadCoreReexport = options.loadCoreReexport;
  }

  getExportsOf(modulePath: string): Set<string> {
    const cached = this.cache.get(modulePath);
    if (cached) return cached;

    if (path.extname(modulePath) === '.node') {
      const nativeModule = this.loadNativeAddon(modulePath);
      const namedExports = new Set(
        Object.keys(nativeModule as Record<string, unknown>),
      );
      this.cache.set(modulePath, namedExports);
      return namedExports;
    }

    const transformedCode =
      this.transformCache.getCachedSource(modulePath) ??
      this.fileCache.readFile(modulePath);

    const {exports, reexports} = parseCjs(transformedCode);
    const namedExports = new Set(exports);

    for (const reexport of reexports) {
      if (this.resolution.isCoreModule(reexport)) {
        const coreExports = this.loadCoreReexport(modulePath, reexport);
        if (coreExports !== null && typeof coreExports === 'object') {
          for (const key of Object.keys(coreExports as Record<string, unknown>))
            namedExports.add(key);
        }
      } else {
        const resolved = this.resolution.resolveCjs(modulePath, reexport);
        for (const key of this.getExportsOf(resolved)) namedExports.add(key);
      }
    }

    this.cache.set(modulePath, namedExports);
    return namedExports;
  }

  clear(): void {
    this.cache.clear();
  }
}
