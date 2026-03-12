import { stripCPF } from "../../src/services/cpf/index.js";
import { getPositionalArgs } from "../shared/cli.js";
const value = getPositionalArgs(process.argv.slice(2), [])[0];
if (!value) {
  console.error("Usage: npm run cpf:strip -- <cpf>");
  process.exit(1);
}
console.log(stripCPF(value));
