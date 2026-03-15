import { Command } from "commander";

import { registerArchiveCommands } from "./commands/register-archive.js";
import { registerBrazilianCommands } from "./commands/register-brazilian.js";
import { registerRandomCommands } from "./commands/register-random.js";
import { registerTextDataCommands } from "./commands/register-text-data.js";
import { rootFooter } from "./shared/help.js";
import { configureProgramUi } from "./ui/output.js";

const CLI_VERSION = "0.3.1";

export function buildProgram(): Command {
  const program = new Command();

  configureProgramUi(program);

  program
    .name("brutils")
    .description("Core Brazilian developer utilities CLI.")
    .version(CLI_VERSION)
    .showHelpAfterError("(use --help for detailed usage)")
    .showSuggestionAfterError(true)
    .addHelpText("after", rootFooter());

  registerBrazilianCommands(program);
  registerTextDataCommands(program);
  registerRandomCommands(program);
  registerArchiveCommands(program);

  return program;
}
