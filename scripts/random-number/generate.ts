import { generateRandomNumbers } from "../../src/services/random-number/random-number.generator.js";

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 ? process.argv[index + 1] : undefined;
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

function formatOutput(values: number[], format: string): string {
  switch (format) {
    case "json":
      return JSON.stringify(values, null, 2);
    case "csv":
      return values.join(",");
    default:
      return values.join(" ");
  }
}

const min = parseOptionalInteger(getArgValue("--min"));
const max = parseOptionalInteger(getArgValue("--max"));
const count = parseOptionalInteger(getArgValue("--count"));
const sorted = hasFlag("--sorted");
const unique = hasFlag("--unique");
const format = getArgValue("--format") ?? "plain";

const result = generateRandomNumbers({
  min,
  max,
  count,
  sorted,
  unique
});

console.log(formatOutput(result, format));