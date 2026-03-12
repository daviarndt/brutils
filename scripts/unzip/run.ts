import { extractZipFile } from "../../src/services/unzip/extract-zip.js";

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 ? process.argv[index + 1] : undefined;
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function main(): Promise<void> {
  const positionalArgs = process.argv.slice(2).filter((arg, index, array) => {
    const previous = array[index - 1];
    if (previous === "--out" || previous === "-o") {
      return false;
    }

    return !arg.startsWith("-");
  });

  const source = positionalArgs[0];
  const positionalOut = positionalArgs[1];

  if (!source) {
    console.error("Usage: npm run unzip:run -- <source> [out] [options]");
    process.exit(1);
  }

  const plan = await extractZipFile(source, positionalOut, {
    out: getArgValue("--out") ?? getArgValue("-o"),
    force: hasFlag("--force") || hasFlag("-f"),
    dryRun: hasFlag("--dry-run"),
    verbose: hasFlag("--verbose") || hasFlag("-v"),
    quiet: hasFlag("--quiet") || hasFlag("-q")
  });

  if (!hasFlag("--quiet") && !hasFlag("-q")) {
    console.log(plan);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
