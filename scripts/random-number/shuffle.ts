import { shuffleRandomItems } from "../../src/services/random-number/index.js";
import {
  getArgValue,
  parseOptionalInteger,
  printLines,
  printStructured,
  resolveItemsFromArgs
} from "../shared/cli.js";

const argv = process.argv.slice(2);
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));
const format = getArgValue(argv, "--format") ?? "plain";
const items = resolveItemsFromArgs(argv);

const result = shuffleRandomItems({
  items,
  seed
});

if (format === "json") {
  printStructured(result);
} else if (format === "csv") {
  console.log(result.join(","));
} else {
  printLines(result);
}
