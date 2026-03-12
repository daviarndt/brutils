import fs from "node:fs";
import path from "node:path";

export function getArgValue(
  argv: string[],
  ...flags: string[]
): string | undefined {
  for (const flag of flags) {
    const index = argv.indexOf(flag);

    if (index !== -1) {
      return argv[index + 1];
    }
  }

  return undefined;
}

export function getArgValues(argv: string[], ...flags: string[]): string[] {
  const values: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (current && flags.includes(current)) {
      const next = argv[index + 1];

      if (next && !next.startsWith("-")) {
        values.push(next);
      }
    }
  }

  return values;
}

export function hasFlag(argv: string[], ...flags: string[]): boolean {
  return flags.some((flag) => argv.includes(flag));
}

export function parseOptionalInteger(value?: string): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error(`Invalid integer value: ${value}`);
  }

  return parsed;
}

export function parseOptionalNumber(value?: string): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  return parsed;
}

export function getPositionalArgs(
  argv: string[],
  valueFlags: string[]
): string[] {
  const valueFlagSet = new Set(valueFlags);
  const positional: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current) {
      continue;
    }

    if (valueFlagSet.has(current)) {
      index += 1;
      continue;
    }

    if (current.startsWith("-")) {
      continue;
    }

    positional.push(current);
  }

  return positional;
}

export function printLines(values: Array<string | number>): void {
  console.log(values.join(""));
}

export function printStructured(value: unknown): void {
  console.log(JSON.stringify(value, null, 2));
}

export function resolveItemsFromArgs(argv: string[]): string[] {
  const inlineItems = getArgValue(argv, "--items");
  const filePath = getArgValue(argv, "--file");

  if (inlineItems && filePath) {
    throw new Error("Use either --items or --file, not both.");
  }

  if (!inlineItems && !filePath) {
    throw new Error("One of --items or --file is required.");
  }

  if (inlineItems) {
    return inlineItems
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const resolvedFilePath = path.resolve(filePath!);
  const content = fs.readFileSync(resolvedFilePath, "utf-8");

  return content
    .split(/?/)
    .map((item) => item.trim())
    .filter(Boolean);
}
