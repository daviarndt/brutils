import { pickRandomNumber } from "../../src/services/number-picker/number-picker.service.js";

function getArgValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 ? process.argv[index + 1] : undefined;
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

const min = parseOptionalInteger(getArgValue("--min"));
const max = parseOptionalInteger(getArgValue("--max"));

const result = pickRandomNumber({
  min,
  max
});

console.log(result);