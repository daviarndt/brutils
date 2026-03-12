import { flipCoin } from "../../src/services/random-number/index.js";
import { getArgValue, parseOptionalInteger } from "../shared/cli.js";

const argv = process.argv.slice(2);
const seed = parseOptionalInteger(getArgValue(argv, "--seed"));

console.log(flipCoin({ seed }));
