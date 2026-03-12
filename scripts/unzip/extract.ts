import { extractZipFile } from "../../src/services/unzip/index.js";
import {
  getArgValue,
  getPositionalArgs,
  hasFlag,
  printStructured
} from "../shared/cli.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const positionalArgs = getPositionalArgs(argv, ["--out", "-o", "--match"]);
  const source = positionalArgs[0];
  const positionalOut = positionalArgs[1];

  if (!source) {
    console.error("Usage: npm run unzip:extract -- <source> [out] [options]");
    process.exit(1);
  }

  const plan = await extractZipFile(source, positionalOut, {
    out: getArgValue(argv, "--out", "-o"),
    force: hasFlag(argv, "--force", "-f"),
    dryRun: hasFlag(argv, "--dry-run"),
    verbose: hasFlag(argv, "--verbose", "-v"),
    quiet: hasFlag(argv, "--quiet", "-q"),
    flat: hasFlag(argv, "--flat"),
    match: getArgValue(argv, "--match")
  });

  if (!hasFlag(argv, "--quiet", "-q")) {
    printStructured(plan);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
