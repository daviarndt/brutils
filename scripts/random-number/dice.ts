import { rollDice } from "../../src/services/random-number/index.js";
import {
  getArgValue,
  parseOptionalInteger,
  printLines,
  printStructured
} from "../shared/cli.js";

const argv = process.argv.slice(2);
const faces = parseOptionalInteger(getArgValue(argv, "--faces"));
const count = parseOptionalInteger(getArgValue(argv, "--count"));
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));
const format = getArgValue(argv, "--format") ?? "plain";

const result = rollDice({
  faces,
  count,
  seed
});

if (format === "json") {
  printStructured(result);
} else if (format === "csv") {
  console.log(result.join(","));
} else {
  printLines(result);
}
