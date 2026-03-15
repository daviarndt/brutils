import type { Command, Option } from "commander";

import { theme } from "./theme.js";

export function configureProgramUi(program: Command): void {
  program.configureOutput({
    writeErr: (str) => process.stderr.write(str),
    outputError: (str, write) => {
      write(theme.red(str));
    }
  });

  program.configureHelp({
    subcommandTerm: (cmd) => theme.command(cmd.name()),
    optionTerm: (option: Option) => theme.flag(option.flags)
  });
}

export function printValue(value: unknown): void {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    console.log(value);
    return;
  }

  if (Array.isArray(value)) {
    if (
      value.every(
        (item) => typeof item === "string" || typeof item === "number"
      )
    ) {
      console.log(value.join("\n"));
      return;
    }
  }

  console.log(JSON.stringify(value, null, 2));
}

export function printRandomValues(
  values: Array<string | number>,
  format: "plain" | "json" | "csv"
): void {
  if (format === "json") {
    console.log(JSON.stringify(values, null, 2));
    return;
  }

  if (format === "csv") {
    console.log(values.join(","));
    return;
  }

  console.log(values.join("\n"));
}

export function handleCliError(error: unknown): never {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`${theme.errorLabel("error")} ${message}`);
  process.exit(1);
}
