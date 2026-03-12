import { validateCPF } from "../../src/services/cpf/index.js";
import { getPositionalArgs, hasFlag } from "../shared/cli.js";
const argv = process.argv.slice(2);
const value = getPositionalArgs(argv, [])[0];
if (!value) {
  console.error("Usage: npm run cpf:validate -- <cpf> [--strict]");
  process.exit(1);
}
console.log(validateCPF(value, { strict: hasFlag(argv, "--strict") }));
