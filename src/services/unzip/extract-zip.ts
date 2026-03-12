import fs from "node:fs";
import path from "node:path";
import extract from "extract-zip";
import { BRUtilsError } from "../../core/errors/brutils.error.js";
import { resolveUnzipOutputPath } from "./resolve-unzip-output.js";
import type { UnzipCommandOptions, UnzipExecutionPlan } from "./unzip.types.js";

function ensureZipSourceIsValid(sourcePath: string): void {
  if (!fs.existsSync(sourcePath)) {
    throw new BRUtilsError(`Zip file does not exist: ${sourcePath}`);
  }

  if (!fs.statSync(sourcePath).isFile()) {
    throw new BRUtilsError(`Source is not a file: ${sourcePath}`);
  }

  if (path.extname(sourcePath).toLowerCase() !== ".zip") {
    throw new BRUtilsError("Only .zip files are supported.");
  }
}

function ensureOutputCanBeExtracted(outputDir: string, force = false): void {
  if (fs.existsSync(outputDir) && !force) {
    throw new BRUtilsError(
      `Output directory already exists: ${outputDir}. Use --force to overwrite it.`
    );
  }

  if (fs.existsSync(outputDir) && force) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  fs.mkdirSync(outputDir, { recursive: true });
}

export function createUnzipExecutionPlan(
  sourcePath: string,
  positionalOut?: string,
  options: UnzipCommandOptions = {}
): UnzipExecutionPlan {
  if (positionalOut && options.out) {
    throw new BRUtilsError("Use either positional [out] or --out, not both.");
  }

  const resolvedSourcePath = path.resolve(sourcePath);
  const resolvedOutputDir = path.resolve(
    resolveUnzipOutputPath(sourcePath, positionalOut ?? options.out)
  );

  return {
    sourcePath: resolvedSourcePath,
    outputDir: resolvedOutputDir
  };
}

export async function extractZipFile(
  sourcePath: string,
  positionalOut?: string,
  options: UnzipCommandOptions = {}
): Promise<UnzipExecutionPlan> {
  const plan = createUnzipExecutionPlan(sourcePath, positionalOut, options);

  ensureZipSourceIsValid(plan.sourcePath);

  if (options.dryRun) {
    return plan;
  }

  ensureOutputCanBeExtracted(plan.outputDir, options.force);

  if (options.verbose && !options.quiet) {
    console.log(`[unzip] extracting ${plan.sourcePath} -> ${plan.outputDir}`);
  }

  await extract(plan.sourcePath, { dir: plan.outputDir });

  return plan;
}
