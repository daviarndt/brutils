import type {
  ZipArchiveEntryInfo,
  ZipTestResult
} from "../archive/zip-archive.types.js";

export interface UnzipCommandOptions {
  out?: string;
  force?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  quiet?: boolean;
  flat?: boolean;
  match?: string;
}

export interface UnzipExecutionPlan {
  sourcePath: string;
  outputDir: string;
  flat: boolean;
  match?: string;
}

export type UnzipListResult = ZipArchiveEntryInfo[];
export type UnzipTestResult = ZipTestResult;
