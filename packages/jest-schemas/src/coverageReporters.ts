/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReportOptions, ReportType} from 'istanbul-reports';

type CoverageReporterWithOptions<K = ReportType> = K extends ReportType
  ? ReportOptions[K] extends never
    ? never
    : [K, Partial<ReportOptions[K]>]
  : never;

export type CoverageReporters = Array<ReportType | CoverageReporterWithOptions>;
