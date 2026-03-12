import { createZip } from "../../src/services/zip/create-zip.js";

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 ? process.argv[index + 1] : undefined;
}

function getArgValues(flag: string): string[] {
  const values: string[] = [];

  process.argv.forEach((arg, index) => {
    if (arg === flag) {
      const next = process.argv[index + 1];
      if (next && !next.startsWith("--") && next !== "-x") {
        values.push(next);
      }
    }
  });

  return values;
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

function parseOptionalInteger(value?: string): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error(`Invalid integer value: ${value}`);
  }

  return parsed;
}

async function main(): Promise<void> {
  const positionalArgs = process.argv.slice(2).filter((arg, index, array) => {
    const previous = array[index - 1];
    if (
      previous === "--out" ||
      previous === "-o" ||
      previous === "--level" ||
      previous === "-l" ||
      previous === "--exclude" ||
      previous === "-x"
    ) {
      return false;
    }

    return !arg.startsWith("-");
  });

  const source = positionalArgs[0];
  const positionalOut = positionalArgs[1];

  if (!source) {
    console.error("Usage: npm run zip:run -- <source> [out] [options]");
    process.exit(1);
  }

  const plan = await createZip(source, positionalOut, {
    out: getArgValue("--out") ?? getArgValue("-o"),
    level: parseOptionalInteger(getArgValue("--level") ?? getArgValue("-l")),
    force: hasFlag("--force") || hasFlag("-f"),
    exclude: [...getArgValues("--exclude"), ...getArgValues("-x")],
    contentsOnly: hasFlag("--contents-only"),
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
