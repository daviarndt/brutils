import { formatCNPJValue } from "../../src/services/cnpj/index.js";
import { getPositionalArgs } from "../shared/cli.js";
const value = getPositionalArgs(process.argv.slice(2), [])[0];
if (!value) {
  console.error("Usage: npm run cnpj:format -- <cnpj>");
  process.exit(1);
}
console.log(formatCNPJValue(value));
