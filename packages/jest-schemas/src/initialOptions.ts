/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Type} from '@sinclair/typebox';
import {
  RawCoverageProvider,
  RawCoverageThreshold,
  RawDisplayName,
  RawHasteConfig,
  RawInlineConfig,
  RawTimers,
} from './shared';
import {RawSnapshotFormat} from './snapshotFormat';

export const RawInitialOptions = Type.Partial(
  Type.Object(
    {
      automock: Type.Readonly(Type.Boolean()),
      bail: Type.Readonly(Type.Union([Type.Boolean(), Type.Number()])),
      cache: Type.Readonly(Type.Boolean()),
      cacheDirectory: Type.Readonly(Type.String()),
      changedFilesWithAncestor: Type.Readonly(Type.Boolean()),
      changedSince: Type.Readonly(Type.String()),
      ci: Type.Readonly(Type.Boolean()),
      clearMocks: Type.Readonly(Type.Boolean()),
      collectCoverage: Type.Readonly(Type.Boolean()),
      collectCoverageFrom: Type.Readonly(Type.Array(Type.String())),
      collectCoverageOnlyFrom: Type.Readonly(
        Type.Record(Type.String(), Type.Boolean()),
      ),
      coverageDirectory: Type.Readonly(Type.String()),
      coveragePathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
      coverageProvider: Type.Readonly(RawCoverageProvider),
      // TODO: this is not correctly typed in the schema
      coverageReporters: Type.Readonly(
        Type.Array(Type.Union([Type.String(), RawInlineConfig])),
      ),
      coverageThreshold: Type.Readonly(RawCoverageThreshold),
      dependencyExtractor: Type.Readonly(Type.String()),
      detectLeaks: Type.Readonly(Type.Boolean()),
      detectOpenHandles: Type.Readonly(Type.Boolean()),
      displayName: Type.Union([Type.String(), RawDisplayName]),
      errorOnDeprecated: Type.Readonly(Type.Boolean()),
      expand: Type.Readonly(Type.Boolean()),
      extensionsToTreatAsEsm: Type.Readonly(Type.Array(Type.String())),
      extraGlobals: Type.Readonly(Type.Array(Type.String())),
      filter: Type.Readonly(Type.String()),
      findRelatedTests: Type.Readonly(Type.Boolean()),
      forceCoverageMatch: Type.Readonly(Type.Array(Type.String())),
      forceExit: Type.Readonly(Type.Boolean()),
      globalSetup: Type.Readonly(
        Type.Union([Type.String(), Type.Null(), Type.Undefined()]),
      ),
      globalTeardown: Type.Readonly(
        Type.Union([Type.String(), Type.Null(), Type.Undefined()]),
      ),
      globals: Type.Readonly(Type.Record(Type.String(), Type.Unknown())),
      haste: Type.Readonly(RawHasteConfig),
      injectGlobals: Type.Readonly(Type.Boolean()),
      json: Type.Readonly(Type.Boolean()),
      lastCommit: Type.Readonly(Type.Boolean()),
      listTests: Type.Readonly(Type.Boolean()),
      logHeapUsage: Type.Readonly(Type.Boolean()),
      maxConcurrency: Type.Readonly(Type.Number()),
      maxWorkers: Type.Readonly(Type.Union([Type.Number(), Type.String()])),
      moduleDirectories: Type.Readonly(Type.Array(Type.String())),
      moduleFileExtensions: Type.Readonly(Type.Array(Type.String())),
      moduleLoader: Type.Readonly(Type.String()),
      moduleNameMapper: Type.Readonly(
        Type.Record(
          Type.String(),
          Type.Union([Type.String(), Type.Array(Type.String())]),
        ),
      ),
      modulePathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
      modulePaths: Type.Readonly(Type.Array(Type.String())),
      name: Type.Readonly(Type.String()),
      noStackTrace: Type.Readonly(Type.Boolean()),
      notify: Type.Readonly(Type.Boolean()),
      notifyMode: Type.Readonly(Type.String()),
      onlyChanged: Type.Readonly(Type.Boolean()),
      onlyFailures: Type.Readonly(Type.Boolean()),
      outputFile: Type.Readonly(Type.String()),
      passWithNoTests: Type.Readonly(Type.Boolean()),
      /**
       * @deprecated Use `transformIgnorePatterns` options instead.
       */
      preprocessorIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
      preset: Type.Readonly(
        Type.Union([Type.String(), Type.Null(), Type.Undefined()]),
      ),
      prettierPath: Type.Readonly(
        Type.Union([Type.String(), Type.Null(), Type.Undefined()]),
      ),
      // projects: Array<Glob | InitialProjectOptions>,
      replname: Type.Readonly(
        Type.Union([Type.String(), Type.Null(), Type.Undefined()]),
      ),
      reporters: Type.Readonly(
        Type.Array(Type.Union([Type.String(), RawInlineConfig])),
      ),
      resetMocks: Type.Readonly(Type.Boolean()),
      resetModules: Type.Readonly(Type.Boolean()),
      resolver: Type.Readonly(
        Type.Union([Type.String(), Type.Null(), Type.Undefined()]),
      ),
      restoreMocks: Type.Readonly(Type.Boolean()),
      rootDir: Type.Readonly(Type.String()),
      roots: Type.Readonly(Type.Array(Type.String())),
      runTestsByPath: Type.Readonly(Type.Boolean()),
      runner: Type.Readonly(Type.String()),
      /**
       * @deprecated Use `transform` options instead.
       */
      scriptPreprocessor: Type.Readonly(Type.String()),
      setupFiles: Type.Readonly(Type.Array(Type.String())),
      setupFilesAfterEnv: Type.Readonly(Type.Array(Type.String())),
      /**
       * @deprecated Use `setupFilesAfterEnv` options instead.
       */
      setupTestFrameworkScriptFile: Type.Readonly(Type.String()),
      silent: Type.Readonly(Type.Boolean()),
      skipFilter: Type.Readonly(Type.Boolean()),
      skipNodeResolution: Type.Readonly(Type.Boolean()),
      slowTestThreshold: Type.Readonly(Type.Number()),
      snapshotFormat: Type.Readonly(RawSnapshotFormat),
      snapshotResolver: Type.Readonly(Type.String()),
      snapshotSerializers: Type.Readonly(Type.Array(Type.String())),
      testEnvironment: Type.Readonly(Type.String()),
      testEnvironmentOptions: Type.Readonly(
        Type.Record(Type.String(), Type.Unknown()),
      ),
      testFailureExitCode: Type.Readonly(
        Type.Union([Type.String(), Type.Number()]),
      ),
      testLocationInResults: Type.Readonly(Type.Boolean()),
      testMatch: Type.Readonly(Type.Array(Type.String())),
      testNamePattern: Type.Readonly(Type.String()),
      /**
       * @deprecated Use `roots` options instead.
       */
      testPathDirs: Type.Readonly(Type.Array(Type.String())),
      testPathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
      testRegex: Type.Readonly(
        Type.Union([Type.String(), Type.Array(Type.String())]),
      ),
      testResultsProcessor: Type.Readonly(Type.String()),
      testRunner: Type.Readonly(Type.String()),
      testSequencer: Type.Readonly(Type.String()),
      testTimeout: Type.Readonly(Type.Number()),
      testURL: Type.Readonly(Type.String()),
      timers: Type.Readonly(RawTimers),
      transform: Type.Record(
        Type.String(),
        Type.Union([Type.String(), RawInlineConfig]),
      ),
      transformIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
      unmockedModulePathPatterns: Type.Readonly(Type.Array(Type.String())),
      updateSnapshot: Type.Readonly(Type.Boolean()),
      useStderr: Type.Readonly(Type.Boolean()),
      verbose: Type.Readonly(Type.Boolean()),
      watch: Type.Readonly(Type.Boolean()),
      watchAll: Type.Readonly(Type.Boolean()),
      watchPathIgnorePatterns: Type.Readonly(Type.Array(Type.String())),
      watchPlugins: Type.Readonly(
        Type.Array(
          Type.Union([
            Type.String(),
            Type.Record(Type.String(), Type.Unknown()),
          ]),
        ),
      ),
      watchman: Type.Readonly(Type.Boolean()),
    },
    {title: "JSON Schema for Jest's configuration file"},
  ),
);
