import { maskCPF } from "../../src/services/cpf/index.js";
import { getArgValue, getPositionalArgs } from "../shared/cli.js";
const argv = process.argv.slice(2);
const value = getPositionalArgs(argv, ["--mask"])[0];
if (!value) {
  console.error("Usage: npm run cpf:mask -- <cpf> [--mask <pattern>]");
  process.exit(1);
}
console.log(maskCPF(value, { pattern: getArgValue(argv, "--mask") }));
