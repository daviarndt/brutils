import { generateCEP, generateCEPBatch } from "../../src/services/cep/index.js";
import type { CEPStateCode } from "../../src/services/cep/index.js";
import {
  getArgValue,
  hasFlag,
  parseOptionalInteger,
  printGenerateOutput
} from "../shared/cli.js";
const argv = process.argv.slice(2);
const formatted = hasFlag(argv, "--formatted");
const state = getArgValue(argv, "--state") as CEPStateCode | undefined;
const count = parseOptionalInteger(getArgValue(argv, "--count")) ?? 1;
const result =
  count === 1
    ? [generateCEP({ formatted, state })]
    : generateCEPBatch({ formatted, state, count });
printGenerateOutput(result);
