import { validateCNPJ } from "../../src/services/cnpj/index.js";
import { getPositionalArgs, hasFlag } from "../shared/cli.js";
const argv = process.argv.slice(2);
const value = getPositionalArgs(argv, [])[0];
if (!value) {
  console.error("Usage: npm run cnpj:validate -- <cnpj> [--strict]");
  process.exit(1);
}
console.log(validateCNPJ(value, { strict: hasFlag(argv, "--strict") }));
