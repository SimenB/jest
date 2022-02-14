/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Type} from '@sinclair/typebox';

export const RawDisplayName = Type.Object({
  color: Type.Readonly(Type.String()),
  name: Type.Readonly(Type.String()),
});

export const RawHasteConfig = Type.Object({
  computeSha1: Type.ReadonlyOptional(
    Type.Boolean({description: 'Whether to hash files using SHA-1.'}),
  ),
  defaultPlatform: Type.ReadonlyOptional(
    Type.Union([Type.String(), Type.Null()], {
      description: "The platform to use as the default, e.g. 'ios'.",
    }),
  ),
  enableSymlinks: Type.ReadonlyOptional(
    Type.Boolean({
      description: `
* Whether to follow symlinks when crawling for files.
  *   This options cannot be used in projects which use watchman.
  *   Projects with \`watchman\` set to true will error if this option is set to true.
  `.trim(),
    }),
  ),
  forceNodeFilesystemAPI: Type.ReadonlyOptional(
    Type.Boolean({
      description:
        "Force use of Node's `fs` APIs rather than shelling out to `find`.",
    }),
  ),
  hasteImplModulePath: Type.ReadonlyOptional(
    Type.String({description: 'Path to a custom implementation of Haste.'}),
  ),
  hasteMapModulePath: Type.ReadonlyOptional(
    Type.String({description: 'Custom HasteMap module.'}),
  ),
  platforms: Type.ReadonlyOptional(
    Type.Array(Type.String(), {
      description: "All platforms to target, e.g ['ios', 'android'].",
    }),
  ),
  throwOnModuleCollision: Type.ReadonlyOptional(
    Type.Boolean({
      description: 'Whether to throw on error on module collision.',
    }),
  ),
});

export const RawTimers = Type.Union([
  Type.Literal('real'),
  Type.Literal('fake'),
  Type.Literal('modern'),
  Type.Literal('legacy'),
]);

export const RawInlineConfig = Type.Tuple([
  Type.String(),
  Type.Record(Type.String(), Type.Unknown()),
]);

export const RawCoverageProvider = Type.Union([
  Type.Literal('babel'),
  Type.Literal('v8'),
]);

const RawCoverageThresholdValue = Type.Object({
  branches: Type.ReadonlyOptional(Type.Number()),
  functions: Type.ReadonlyOptional(Type.Number()),
  lines: Type.ReadonlyOptional(Type.Number()),
  statements: Type.ReadonlyOptional(Type.Number()),
});

export const RawCoverageThreshold = Type.Record(
  Type.Union([Type.String(), Type.Literal('global')]),
  RawCoverageThresholdValue,
);
