import {
  generateCNPJ,
  generateCNPJBatch
} from "../../src/services/cnpj/index.js";
import {
  getArgValue,
  hasFlag,
  parseOptionalInteger,
  printGenerateOutput
} from "../shared/cli.js";
const argv = process.argv.slice(2);
const formatted = hasFlag(argv, "--formatted");
const branch = getArgValue(argv, "--branch");
const count = parseOptionalInteger(getArgValue(argv, "--count")) ?? 1;
const unique = hasFlag(argv, "--unique");
const result =
  count === 1
    ? [generateCNPJ({ formatted, branch })]
    : generateCNPJBatch({ formatted, branch, count, unique });
printGenerateOutput(result);
