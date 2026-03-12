import { formatCEPValue } from "../../src/services/cep/index.js";
import { getPositionalArgs } from "../shared/cli.js";
const value = getPositionalArgs(process.argv.slice(2), [])[0];
if (!value) {
  console.error("Usage: npm run cep:format -- <cep>");
  process.exit(1);
}
console.log(formatCEPValue(value));
