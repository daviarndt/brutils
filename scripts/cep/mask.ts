import { maskCEP } from "../../src/services/cep/index.js";
import { getArgValue, getPositionalArgs } from "../shared/cli.js";
const argv = process.argv.slice(2);
const value = getPositionalArgs(argv, ["--mask"])[0];
if (!value) {
  console.error("Usage: npm run cep:mask -- <cep> [--mask <pattern>]");
  process.exit(1);
}
console.log(maskCEP(value, { pattern: getArgValue(argv, "--mask") }));
