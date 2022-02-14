/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Type} from '@sinclair/typebox';
import {RawDisplayName, RawHasteConfig, RawTimers} from './shared';
import {RawSnapshotFormat} from './snapshotFormat';

export const RawProjectConfig = Type.Object({
  automock: Type.Readonly(Type.Boolean()),
  cache: Type.Readonly(Type.Boolean()),
  cacheDirectory: Type.Readonly(Type.String()),
  clearMocks: Type.Readonly(Type.Boolean()),
  coveragePathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
  cwd: Type.Readonly(Type.String()),
  dependencyExtractor: Type.ReadonlyOptional(Type.String()),
  detectLeaks: Type.Readonly(Type.Boolean()),
  detectOpenHandles: Type.Readonly(Type.Boolean()),
  displayName: Type.ReadonlyOptional(RawDisplayName),
  errorOnDeprecated: Type.Readonly(Type.Boolean()),
  extensionsToTreatAsEsm: Type.Readonly(Type.Array(Type.String())),
  extraGlobals: Type.Readonly(Type.Array(Type.String())),
  filter: Type.ReadonlyOptional(Type.String()),
  forceCoverageMatch: Type.Readonly(Type.Array(Type.String())),
  globalSetup: Type.ReadonlyOptional(Type.String()),
  globalTeardown: Type.ReadonlyOptional(Type.String()),
  globals: Type.Readonly(Type.Record(Type.String(), Type.Unknown())),
  haste: Type.Readonly(RawHasteConfig),
  injectGlobals: Type.Readonly(Type.Boolean()),
  moduleDirectories: Type.Readonly(Type.Array(Type.String())),
  moduleFileExtensions: Type.Readonly(Type.Array(Type.String())),
  moduleLoader: Type.ReadonlyOptional(Type.String()),
  moduleNameMapper: Type.Readonly(
    Type.Array(Type.Tuple([Type.String(), Type.String()])),
  ),
  modulePathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
  modulePaths: Type.ReadonlyOptional(Type.Array(Type.String())),
  name: Type.Readonly(Type.String()),
  prettierPath: Type.Readonly(Type.String()),
  resetMocks: Type.Readonly(Type.Boolean()),
  resetModules: Type.Readonly(Type.Boolean()),
  resolver: Type.ReadonlyOptional(Type.String()),
  restoreMocks: Type.Readonly(Type.Boolean()),
  rootDir: Type.Readonly(Type.String()),
  roots: Type.Readonly(Type.Array(Type.String())),
  runner: Type.Readonly(Type.String()),
  setupFiles: Type.Readonly(Type.Array(Type.String())),
  setupFilesAfterEnv: Type.Readonly(Type.Array(Type.String())),
  skipFilter: Type.Readonly(Type.Boolean()),
  skipNodeResolution: Type.ReadonlyOptional(Type.Boolean()),
  slowTestThreshold: Type.Readonly(Type.Number()),
  snapshotFormat: Type.Readonly(RawSnapshotFormat),
  snapshotResolver: Type.ReadonlyOptional(Type.String()),
  snapshotSerializers: Type.Readonly(Type.Array(Type.String())),
  testEnvironment: Type.Readonly(Type.String()),
  testEnvironmentOptions: Type.Readonly(
    Type.Record(Type.String(), Type.Unknown()),
  ),
  testLocationInResults: Type.Readonly(Type.Boolean()),
  testMatch: Type.Readonly(Type.Array(Type.String())),
  testPathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
  testRegex: Type.Readonly(
    Type.Array(Type.Union([Type.String(), Type.String()])),
  ),
  testRunner: Type.Readonly(Type.String()),
  testURL: Type.Readonly(Type.String()),
  timers: Type.Readonly(RawTimers),
  transform: Type.Readonly(
    Type.Array(
      Type.Tuple([
        Type.String(),
        Type.String(),
        Type.Record(Type.String(), Type.Unknown()),
      ]),
    ),
  ),
  transformIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
  unmockedModulePathPatterns: Type.ReadonlyOptional(Type.Array(Type.String())),
  watchPathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
});
