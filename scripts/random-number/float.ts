import { generateRandomFloats } from "../../src/services/random-number/index.js";
import {
  getArgValue,
  hasFlag,
  parseOptionalInteger,
  parseOptionalNumber,
  printLines,
  printStructured
} from "../shared/cli.js";

const argv = process.argv.slice(2);
const min = parseOptionalNumber(getArgValue(argv, "--min"));
const max = parseOptionalNumber(getArgValue(argv, "--max"));
const count = parseOptionalInteger(getArgValue(argv, "--count"));
const precision = parseOptionalInteger(getArgValue(argv, "--precision"));
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));
const sorted = hasFlag(argv, "--sorted");
const format = getArgValue(argv, "--format") ?? "plain";

const result = generateRandomFloats({
  min,
  max,
  count,
  precision,
  seed,
  sorted
});

if (format === "json") {
  printStructured(result);
} else if (format === "csv") {
  console.log(result.join(","));
} else {
  printLines(result);
}
