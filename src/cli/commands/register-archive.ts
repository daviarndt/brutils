import type { Command } from "commander";

import { createZip, listZip, testZip } from "../../services/zip/index.js";
import {
  extractZipFile,
  listUnzip,
  testUnzip
} from "../../services/unzip/index.js";
import { examples } from "../shared/help.js";
import { parseInteger } from "../shared/parsers.js";
import { printValue } from "../ui/output.js";

export function registerArchiveCommands(program: Command): void {
  const zip = program
    .command("zip")
    .description("Create zip archives and inspect them.")
    .addHelpText(
      "after",
      examples([
        "brutils zip create ./folder",
        "brutils zip create ./folder ./backup.zip",
        "brutils zip create ./folder --out ./backup.zip --force",
        "brutils zip create ./folder --contents-only --exclude node_modules --exclude dist",
        'brutils zip list ./backup.zip --match "**/*.txt"',
        "brutils zip test ./backup.zip"
      ])
    );

  zip
    .command("create")
    .alias("run")
    .argument("<source>", "File or folder to archive.")
    .argument("[out]", "Optional output .zip file path.")
    .description("Create a zip archive from a source path.")
    .option("-o, --out <path>", "Explicit output file path.")
    .option(
      "-l, --level <number>",
      "Compression level from 0 to 9.",
      parseInteger
    )
    .option(
      "-x, --exclude <glob...>",
      "Glob patterns to exclude when zipping folder contents."
    )
    .option(
      "--contents-only",
      "Zip only the folder contents instead of the folder root."
    )
    .option("-f, --force", "Overwrite output if it already exists.")
    .option(
      "--dry-run",
      "Print the execution plan without writing the archive."
    )
    .option("-v, --verbose", "Show verbose archive creation logs.")
    .option("-q, --quiet", "Suppress non-error output.")
    .option(
      "--follow-symlinks",
      "Follow symbolic links while collecting inputs."
    )
    .option("--store", "Store files without compression.")
    .action(
      async (
        source: string,
        out: string | undefined,
        options: {
          out?: string;
          level?: number;
          exclude?: string[];
          contentsOnly?: boolean;
          force?: boolean;
          dryRun?: boolean;
          verbose?: boolean;
          quiet?: boolean;
          followSymlinks?: boolean;
          store?: boolean;
        }
      ) => {
        const plan = await createZip(source, out, options);

        if (!options.quiet) {
          printValue(plan);
        }
      }
    );

  zip
    .command("list")
    .argument("<source>", "Existing .zip file to inspect.")
    .description("List archive contents without extracting.")
    .option("--match <pattern>", "Filter which archive entries are included.")
    .option("-q, --quiet", "Suppress non-error output.")
    .action(
      async (source: string, options: { match?: string; quiet?: boolean }) => {
        const result = await listZip(source, options.match);

        if (!options.quiet) {
          printValue(result);
        }
      }
    );

  zip
    .command("test")
    .argument("<source>", "Existing .zip file to validate.")
    .description("Test archive readability without extracting files.")
    .option("--match <pattern>", "Filter which archive entries are included.")
    .option("-q, --quiet", "Suppress non-error output.")
    .action(
      async (source: string, options: { match?: string; quiet?: boolean }) => {
        const result = await testZip(source, options.match);

        if (!options.quiet) {
          printValue(result);
        }
      }
    );

  const unzip = program
    .command("unzip")
    .description("Extract zip archives and inspect them.")
    .addHelpText(
      "after",
      examples([
        "brutils unzip extract ./backup.zip",
        "brutils unzip extract ./backup.zip ./output",
        "brutils unzip extract ./backup.zip --out ./output --force",
        'brutils unzip extract ./backup.zip --flat --match "**/*.txt"',
        "brutils unzip list ./backup.zip",
        "brutils unzip test ./backup.zip"
      ])
    );

  unzip
    .command("extract")
    .alias("run")
    .argument("<source>", "Existing .zip file to extract.")
    .argument("[out]", "Optional destination directory.")
    .description("Extract a zip archive.")
    .option("-o, --out <path>", "Explicit output directory.")
    .option(
      "-f, --force",
      "Overwrite the target directory if it already exists."
    )
    .option("--dry-run", "Print the extraction plan without writing files.")
    .option("-v, --verbose", "Show verbose extraction logs.")
    .option("-q, --quiet", "Suppress non-error output.")
    .option("--flat", "Extract files without preserving nested folders.")
    .option("--match <pattern>", "Filter which archive entries are extracted.")
    .action(
      async (
        source: string,
        out: string | undefined,
        options: {
          out?: string;
          force?: boolean;
          dryRun?: boolean;
          verbose?: boolean;
          quiet?: boolean;
          flat?: boolean;
          match?: string;
        }
      ) => {
        const plan = await extractZipFile(source, out, options);

        if (!options.quiet) {
          printValue(plan);
        }
      }
    );

  unzip
    .command("list")
    .argument("<source>", "Existing .zip file to inspect.")
    .description("List archive contents without extracting.")
    .option("--match <pattern>", "Filter which archive entries are included.")
    .option("-q, --quiet", "Suppress non-error output.")
    .action(
      async (source: string, options: { match?: string; quiet?: boolean }) => {
        const result = await listUnzip(source, options.match);

        if (!options.quiet) {
          printValue(result);
        }
      }
    );

  unzip
    .command("test")
    .argument("<source>", "Existing .zip file to validate.")
    .description("Test archive readability without extracting files.")
    .option("--match <pattern>", "Filter which archive entries are included.")
    .option("-q, --quiet", "Suppress non-error output.")
    .action(
      async (source: string, options: { match?: string; quiet?: boolean }) => {
        const result = await testUnzip(source, options.match);

        if (!options.quiet) {
          printValue(result);
        }
      }
    );
}
