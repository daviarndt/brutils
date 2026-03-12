import { createZip } from "../../src/services/zip/index.js";
import {
  getArgValue,
  getArgValues,
  getPositionalArgs,
  hasFlag,
  parseOptionalInteger,
  printStructured
} from "../shared/cli.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const positionalArgs = getPositionalArgs(argv, [
    "--out",
    "-o",
    "--level",
    "-l",
    "--exclude",
    "-x"
  ]);

  const source = positionalArgs[0];
  const positionalOut = positionalArgs[1];

  if (!source) {
    console.error("Usage: npm run zip:create -- <source> [out] [options]");
    process.exit(1);
  }

  const plan = await createZip(source, positionalOut, {
    out: getArgValue(argv, "--out", "-o"),
    level: parseOptionalInteger(getArgValue(argv, "--level", "-l")),
    force: hasFlag(argv, "--force", "-f"),
    exclude: [...getArgValues(argv, "--exclude", "-x")],
    contentsOnly: hasFlag(argv, "--contents-only"),
    dryRun: hasFlag(argv, "--dry-run"),
    verbose: hasFlag(argv, "--verbose", "-v"),
    quiet: hasFlag(argv, "--quiet", "-q"),
    followSymlinks: hasFlag(argv, "--follow-symlinks"),
    store: hasFlag(argv, "--store")
  });

  if (!hasFlag(argv, "--quiet", "-q")) {
    printStructured(plan);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
