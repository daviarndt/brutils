import { maskCNPJ } from "../../src/services/cnpj/index.js";
import { getArgValue, getPositionalArgs } from "../shared/cli.js";
const argv = process.argv.slice(2);
const value = getPositionalArgs(argv, ["--mask"])[0];
if (!value) {
  console.error("Usage: npm run cnpj:mask -- <cnpj> [--mask <pattern>]");
  process.exit(1);
}
console.log(maskCNPJ(value, { pattern: getArgValue(argv, "--mask") }));
