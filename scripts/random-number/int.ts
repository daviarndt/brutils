import { generateRandomIntegers } from "../../src/services/random-number/index.js";
import {
  getArgValue,
  hasFlag,
  parseOptionalInteger,
  printLines,
  printStructured
} from "../shared/cli.js";

const argv = process.argv.slice(2);
const min = parseOptionalInteger(getArgValue(argv, "--min"));
const max = parseOptionalInteger(getArgValue(argv, "--max"));
const count = parseOptionalInteger(getArgValue(argv, "--count"));
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));
const sorted = hasFlag(argv, "--sorted");
const unique = hasFlag(argv, "--unique");
const format = getArgValue(argv, "--format") ?? "plain";

const result = generateRandomIntegers({
  min,
  max,
  count,
  seed,
  sorted,
  unique
});

if (format === "json") {
  printStructured(result);
} else if (format === "csv") {
  console.log(result.join(","));
} else {
  printLines(result);
}
