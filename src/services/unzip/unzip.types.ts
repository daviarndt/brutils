export interface UnzipCommandOptions {
  out?: string;
  force?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  quiet?: boolean;
}

export interface UnzipExecutionPlan {
  sourcePath: string;
  outputDir: string;
}
