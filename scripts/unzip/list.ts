import { listUnzip } from "../../src/services/unzip/index.js";
import {
  getArgValue,
  getPositionalArgs,
  hasFlag,
  printStructured
} from "../shared/cli.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const source = getPositionalArgs(argv, ["--match"])[0];

  if (!source) {
    console.error("Usage: npm run unzip:list -- <source> [--match <pattern>]");
    process.exit(1);
  }

  const result = await listUnzip(source, getArgValue(argv, "--match"));

  if (!hasFlag(argv, "--quiet", "-q")) {
    printStructured(result);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
