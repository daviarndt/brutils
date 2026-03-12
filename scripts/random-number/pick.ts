import { pickRandomItems } from "../../src/services/random-number/index.js";
import {
  getArgValue,
  hasFlag,
  parseOptionalInteger,
  printLines,
  printStructured,
  resolveItemsFromArgs
} from "../shared/cli.js";

const argv = process.argv.slice(2);
const count = parseOptionalInteger(getArgValue(argv, "--count"));
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));
const unique = hasFlag(argv, "--unique");
const format = getArgValue(argv, "--format") ?? "plain";
const items = resolveItemsFromArgs(argv);

const result = pickRandomItems({
  items,
  count,
  seed,
  unique
});

if (format === "json") {
  printStructured(result);
} else if (format === "csv") {
  console.log(result.join(","));
} else {
  printLines(result);
}
