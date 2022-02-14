/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Static, Type} from '@sinclair/typebox';
import type {CoverageReporters} from './coverageReporters';
import {RawGlobalConfig} from './globalConfig';
import {RawInitialOptions} from './initialOptions';
import {RawProjectConfig} from './projectConfig';
import {RawSnapshotFormat} from './snapshotFormat';

export const SnapshotFormat = Type.Strict(RawSnapshotFormat);
export type SnapshotFormat = Static<typeof RawSnapshotFormat>;

export const InitialOptions = Type.Strict(RawInitialOptions);
export type InitialOptions = Omit<
  Static<typeof RawInitialOptions>,
  'coverageReporters'
> & {
  coverageReporters?: CoverageReporters;
};

export const GlobalConfig = Type.Strict(RawGlobalConfig);
export type GlobalConfig = Omit<
  Static<typeof RawGlobalConfig>,
  'coverageReporters'
> & {
  coverageReporters: CoverageReporters;
};

export const ProjectConfig = Type.Strict(RawProjectConfig);
export type ProjectConfig = Omit<
  Static<typeof RawProjectConfig>,
  'extraGlobals'
> & {
  extraGlobals: Array<keyof typeof globalThis>;
};
