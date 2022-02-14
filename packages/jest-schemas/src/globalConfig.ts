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
  RawInlineConfig,
} from './shared';
import {RawSnapshotFormat} from './snapshotFormat';

export const RawGlobalConfig = Type.Object({
  bail: Type.Readonly(Type.Number()),
  changedFilesWithAncestor: Type.Readonly(Type.Boolean()),
  changedSince: Type.ReadonlyOptional(Type.String()),
  ci: Type.Readonly(Type.Boolean()),
  collectCoverage: Type.Readonly(Type.Boolean()),
  collectCoverageFrom: Type.Readonly(Type.Array(Type.String())),
  collectCoverageOnlyFrom: Type.ReadonlyOptional(
    Type.Record(Type.String(), Type.Boolean()),
  ),
  coverageDirectory: Type.Readonly(Type.String()),
  coveragePathIgnorePatterns: Type.ReadonlyOptional(Type.Array(Type.String())),
  coverageProvider: Type.Readonly(RawCoverageProvider),
  // TODO: this is not correctly typed in the schema
  coverageReporters: Type.Readonly(
    Type.Array(Type.Union([Type.String(), RawInlineConfig])),
  ),
  coverageThreshold: Type.Readonly(RawCoverageThreshold),
  detectLeaks: Type.Readonly(Type.Boolean()),
  detectOpenHandles: Type.Readonly(Type.Boolean()),
  errorOnDeprecated: Type.Readonly(Type.Boolean()),
  expand: Type.Readonly(Type.Boolean()),
  filter: Type.ReadonlyOptional(Type.String()),
  findRelatedTests: Type.Readonly(Type.Boolean()),
  forceExit: Type.Readonly(Type.Boolean()),
  globalSetup: Type.ReadonlyOptional(Type.String()),
  globalTeardown: Type.ReadonlyOptional(Type.String()),
  json: Type.Readonly(Type.Boolean()),
  lastCommit: Type.Readonly(Type.Boolean()),
  listTests: Type.Readonly(Type.Boolean()),
  logHeapUsage: Type.Readonly(Type.Boolean()),
  maxConcurrency: Type.Readonly(Type.Number()),
  maxWorkers: Type.Readonly(Type.Number()),
  noSCM: Type.ReadonlyOptional(Type.Boolean()),
  noStackTrace: Type.Readonly(Type.Boolean()),
  nonFlagArgs: Type.Readonly(Type.Array(Type.String())),
  notify: Type.Readonly(Type.Boolean()),
  notifyMode: Type.Readonly(
    Type.Union([
      Type.Literal('always'),
      Type.Literal('failure'),
      Type.Literal('success'),
      Type.Literal('change'),
      Type.Literal('success-change'),
      Type.Literal('failure-change'),
    ]),
  ),
  onlyChanged: Type.Readonly(Type.Boolean()),
  onlyFailures: Type.Readonly(Type.Boolean()),
  outputFile: Type.ReadonlyOptional(Type.String()),
  passWithNoTests: Type.Readonly(Type.Boolean()),
  projects: Type.Readonly(Type.Array(Type.String())),
  replname: Type.ReadonlyOptional(Type.String()),
  reporters: Type.ReadonlyOptional(
    Type.Array(
      Type.Union([
        Type.String(),
        Type.Tuple([Type.String(), Type.Record(Type.String(), Type.Unknown())]),
      ]),
    ),
  ),
  rootDir: Type.Readonly(Type.String()),
  runTestsByPath: Type.Readonly(Type.Boolean()),
  silent: Type.ReadonlyOptional(Type.Boolean()),
  skipFilter: Type.Readonly(Type.Boolean()),
  snapshotFormat: Type.Readonly(RawSnapshotFormat),
  testFailureExitCode: Type.Readonly(Type.Number()),
  testNamePattern: Type.ReadonlyOptional(Type.String()),
  testPathPattern: Type.Readonly(Type.String()),
  testResultsProcessor: Type.ReadonlyOptional(Type.String()),
  testSequencer: Type.Readonly(Type.String()),
  testTimeout: Type.ReadonlyOptional(Type.Number()),
  updateSnapshot: Type.Readonly(
    Type.Union([
      Type.Literal('all'),
      Type.Literal('new'),
      Type.Literal('none'),
    ]),
  ),
  useStderr: Type.Readonly(Type.Boolean()),
  verbose: Type.ReadonlyOptional(Type.Boolean()),
  watch: Type.Readonly(Type.Boolean()),
  watchAll: Type.Readonly(Type.Boolean()),
  watchPlugins: Type.ReadonlyOptional(
    Type.Array(
      Type.Object({
        config: Type.Readonly(Type.Record(Type.String(), Type.Unknown())),
        path: Type.Readonly(Type.String()),
      }),
    ),
  ),
  watchman: Type.Readonly(Type.Boolean()),
});
