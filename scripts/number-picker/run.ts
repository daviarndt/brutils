import { pickRandomNumber } from "../../src/services/number-picker/index.js";
import { getArgValue, parseOptionalInteger } from "../shared/cli.js";

const argv = process.argv.slice(2);
const min = parseOptionalInteger(getArgValue(argv, "--min"));
const max = parseOptionalInteger(getArgValue(argv, "--max"));
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));

const result = pickRandomNumber({
  min,
  max,
  seed
});

console.log(result);
