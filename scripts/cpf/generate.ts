import { generateCPF, generateCPFBatch } from "../../src/services/cpf/index.js";
import type { CPFStateCode } from "../../src/services/cpf/index.js";
import {
  getArgValue,
  hasFlag,
  parseOptionalInteger,
  printGenerateOutput
} from "../shared/cli.js";
const argv = process.argv.slice(2);
const formatted = hasFlag(argv, "--formatted");
const state = getArgValue(argv, "--state") as CPFStateCode | undefined;
const count = parseOptionalInteger(getArgValue(argv, "--count")) ?? 1;
const unique = hasFlag(argv, "--unique");
const result =
  count === 1
    ? [generateCPF({ formatted, state })]
    : generateCPFBatch({ formatted, state, count, unique });
printGenerateOutput(result);
