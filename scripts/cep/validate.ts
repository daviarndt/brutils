import { validateCEP } from "../../src/services/cep/index.js";
import { getPositionalArgs, hasFlag } from "../shared/cli.js";
const argv = process.argv.slice(2);
const value = getPositionalArgs(argv, [])[0];
if (!value) {
  console.error("Usage: npm run cep:validate -- <cep> [--strict]");
  process.exit(1);
}
console.log(validateCEP(value, { strict: hasFlag(argv, "--strict") }));
