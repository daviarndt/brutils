import type { Command } from "commander";

import {
  convertJsonToYaml,
  deleteJsonPathValue,
  diffJsonValues,
  formatJsonValue,
  getJsonPathValue,
  mergeJsonValues,
  minifyJsonValue,
  parseJsonInput,
  setJsonPathValue,
  validateJsonInput
} from "../../services/json/index.js";
import {
  convertStringCase,
  extractText,
  normalizeText,
  padText,
  removeAccents,
  replaceText,
  slugifyText,
  transformBase64,
  transformHtmlEntities,
  transformUrlEncoding,
  trimText,
  truncateText,
  type StringCaseStyle,
  type StringCodecMode,
  type StringPadSide
} from "../../services/str/index.js";
import { examples } from "../shared/help.js";
import {
  readDiffJsonSource,
  readMultipleJsonSources,
  readSingleJsonSource,
  readTextSource,
  writeTextFile
} from "../shared/io.js";
import {
  parseInteger,
  parsePositiveInteger,
  parseStringCaseStyle,
  parseStringCodecMode,
  parseStringPadSide
} from "../shared/parsers.js";
import { printValue } from "../ui/output.js";

export function registerTextDataCommands(program: Command): void {
  const str = program
    .command("str")
    .description("String transformations and encoding helpers.")
    .addHelpText(
      "after",
      examples([
        'brutils str slug --text "Olá Mundo Legal"',
        'brutils str case --text "minha variavel legal" --to camel',
        'brutils str truncate --text "hello world" --max 8 --suffix "..."',
        'brutils str replace --text "hello 123" --from "\\\\d+" --with "X" --regex',
        'brutils str extract "\\\\[(.*?)\\\\]" --text "[one] [two]" --regex',
        'brutils str base64 --text "hello" --mode encode'
      ])
    );

  str
    .command("slug")
    .description("Convert text to a URL-friendly slug.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .action((options: { text?: string; file?: string }) => {
      printValue(slugifyText(readTextSource(options)));
    });

  str
    .command("case")
    .description("Convert text between casing styles.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .requiredOption(
      "--to <style>",
      "Target style: camel, snake, kebab, pascal, constant or title.",
      parseStringCaseStyle
    )
    .action(
      (options: { text?: string; file?: string; to: StringCaseStyle }) => {
        printValue(convertStringCase(readTextSource(options), options.to));
      }
    );

  str
    .command("trim")
    .description("Remove surrounding spaces and newlines.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .action((options: { text?: string; file?: string }) => {
      printValue(trimText(readTextSource(options)));
    });

  str
    .command("truncate")
    .description("Cut text to a maximum length.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .requiredOption("--max <number>", "Maximum length.", parsePositiveInteger)
    .option("--suffix <value>", "Suffix to append after truncation.")
    .action(
      (options: {
        text?: string;
        file?: string;
        max: number;
        suffix?: string;
      }) => {
        printValue(
          truncateText(readTextSource(options), {
            max: options.max,
            ...(options.suffix !== undefined ? { suffix: options.suffix } : {})
          })
        );
      }
    );

  str
    .command("replace")
    .description("Replace text fragments or regex matches.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .requiredOption("--from <value>", "Text or regex pattern to replace.")
    .requiredOption("--with <value>", "Replacement value.")
    .option("--regex", "Interpret --from as a regex pattern.")
    .action(
      (options: {
        text?: string;
        file?: string;
        from: string;
        with: string;
        regex?: boolean;
      }) => {
        printValue(
          replaceText(readTextSource(options), {
            from: options.from,
            with: options.with,
            ...(options.regex !== undefined ? { regex: options.regex } : {})
          })
        );
      }
    );

  str
    .command("normalize")
    .description("Normalize text using Unicode NFC.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .action((options: { text?: string; file?: string }) => {
      printValue(normalizeText(readTextSource(options)));
    });

  str
    .command("remove-accents")
    .description("Remove accents and diacritics from text.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .action((options: { text?: string; file?: string }) => {
      printValue(removeAccents(readTextSource(options)));
    });

  str
    .command("pad")
    .description("Pad a string with spaces on the left, right or both sides.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .requiredOption(
      "--length <number>",
      "Target text length.",
      parsePositiveInteger
    )
    .option(
      "--side <side>",
      "Pad direction: left, right or both.",
      parseStringPadSide,
      "right"
    )
    .action(
      (options: {
        text?: string;
        file?: string;
        length: number;
        side: StringPadSide;
      }) => {
        printValue(
          padText(readTextSource(options), {
            length: options.length,
            side: options.side
          })
        );
      }
    );

  str
    .command("extract")
    .argument("<query>", 'Regex pattern or delimiter pair such as "start|end".')
    .description("Extract content by regex or by delimiter pairs.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .option("--regex", "Interpret the query as a regex pattern.")
    .action(
      (
        query: string,
        options: { text?: string; file?: string; regex?: boolean }
      ) => {
        printValue(
          extractText(readTextSource(options), query, {
            ...(options.regex !== undefined ? { regex: options.regex } : {})
          })
        );
      }
    );

  str
    .command("base64")
    .description("Encode or decode Base64 values.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .option(
      "--mode <mode>",
      "Use encode or decode mode.",
      parseStringCodecMode,
      "encode"
    )
    .action(
      (options: { text?: string; file?: string; mode: StringCodecMode }) => {
        printValue(transformBase64(readTextSource(options), options.mode));
      }
    );

  str
    .command("urlencode")
    .description("Encode or decode URL-safe content.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .option(
      "--mode <mode>",
      "Use encode or decode mode.",
      parseStringCodecMode,
      "encode"
    )
    .action(
      (options: { text?: string; file?: string; mode: StringCodecMode }) => {
        printValue(transformUrlEncoding(readTextSource(options), options.mode));
      }
    );

  str
    .command("html")
    .description("Encode or decode basic HTML entities.")
    .option("--text <value>", "Inline text input.")
    .option("--file <path>", "Read input text from a file.")
    .option(
      "--mode <mode>",
      "Use encode or decode mode.",
      parseStringCodecMode,
      "encode"
    )
    .action(
      (options: { text?: string; file?: string; mode: StringCodecMode }) => {
        printValue(
          transformHtmlEntities(readTextSource(options), options.mode)
        );
      }
    );

  const jsonCommand = program
    .command("json")
    .description("Local JSON formatting, editing and diff helpers.")
    .addHelpText(
      "after",
      examples([
        "brutils json format --file ./config.json --sort-keys",
        "brutils json validate --value '{\"ok\":true}'",
        "brutils json get --file ./config.json --path server.port",
        "brutils json set --file ./config.json --path flags.dev --set-value true --in-place",
        "brutils json diff --left ./a.json --right ./b.json",
        "brutils json merge --file ./base.json --file ./override.json",
        'brutils json to-yaml --value \'{"name":"brutils"}\''
      ])
    );

  jsonCommand
    .command("format")
    .description("Pretty-print JSON.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .option(
      "--indent <number>",
      "Pretty-print indentation size.",
      parseInteger,
      2
    )
    .option("--sort-keys", "Sort object keys recursively before printing.")
    .option("--in-place", "Write the formatted content back to the input file.")
    .action(
      (options: {
        file?: string;
        value?: string;
        indent: number;
        sortKeys?: boolean;
        inPlace?: boolean;
      }) => {
        const source = readSingleJsonSource(options);
        const result = formatJsonValue(
          source.parsed,
          options.indent,
          options.sortKeys ?? false
        );

        if (options.inPlace) {
          if (!source.sourcePath) {
            throw new Error("--in-place requires --file.");
          }

          writeTextFile(source.sourcePath, `${result}\n`);
        }

        printValue(result);
      }
    );

  jsonCommand
    .command("minify")
    .description("Minify JSON.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .option("--in-place", "Write the minified content back to the input file.")
    .action((options: { file?: string; value?: string; inPlace?: boolean }) => {
      const source = readSingleJsonSource(options);
      const result = minifyJsonValue(source.parsed);

      if (options.inPlace) {
        if (!source.sourcePath) {
          throw new Error("--in-place requires --file.");
        }

        writeTextFile(source.sourcePath, result);
      }

      printValue(result);
    });

  jsonCommand
    .command("validate")
    .description("Validate JSON syntax.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .action((options: { file?: string; value?: string }) => {
      const source = readSingleJsonSource(options);
      printValue(validateJsonInput(source.raw));
    });

  jsonCommand
    .command("get")
    .description("Read a path from JSON.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .requiredOption("--path <value>", "JSON path to read.")
    .action((options: { file?: string; value?: string; path: string }) => {
      const source = readSingleJsonSource(options);
      printValue(getJsonPathValue(source.parsed, options.path));
    });

  jsonCommand
    .command("set")
    .description("Write a path in JSON.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .requiredOption("--path <value>", "JSON path to update.")
    .requiredOption(
      "--set-value <json>",
      "New JSON value to write at the path."
    )
    .option("--in-place", "Write the updated content back to the input file.")
    .action(
      (options: {
        file?: string;
        value?: string;
        path: string;
        setValue: string;
        inPlace?: boolean;
      }) => {
        const source = readSingleJsonSource(options);
        const updated = setJsonPathValue(
          source.parsed,
          options.path,
          parseJsonInput(options.setValue)
        );
        const formatted = formatJsonValue(updated, 2, false);

        if (options.inPlace) {
          if (!source.sourcePath) {
            throw new Error("--in-place requires --file.");
          }

          writeTextFile(source.sourcePath, `${formatted}\n`);
        }

        printValue(updated);
      }
    );

  jsonCommand
    .command("delete")
    .description("Remove a path from JSON.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .requiredOption("--path <value>", "JSON path to delete.")
    .option("--in-place", "Write the updated content back to the input file.")
    .action(
      (options: {
        file?: string;
        value?: string;
        path: string;
        inPlace?: boolean;
      }) => {
        const source = readSingleJsonSource(options);
        const updated = deleteJsonPathValue(source.parsed, options.path);
        const formatted = formatJsonValue(updated, 2, false);

        if (options.inPlace) {
          if (!source.sourcePath) {
            throw new Error("--in-place requires --file.");
          }

          writeTextFile(source.sourcePath, `${formatted}\n`);
        }

        printValue(updated);
      }
    );

  jsonCommand
    .command("diff")
    .description("Diff two JSON values or files.")
    .requiredOption(
      "--left <source>",
      "Left JSON file path or inline JSON value."
    )
    .requiredOption(
      "--right <source>",
      "Right JSON file path or inline JSON value."
    )
    .action((options: { left: string; right: string }) => {
      printValue(
        diffJsonValues(
          readDiffJsonSource(options.left),
          readDiffJsonSource(options.right)
        )
      );
    });

  jsonCommand
    .command("merge")
    .description("Merge multiple JSON sources.")
    .option("--file <paths...>", "Read JSON from one or more files.")
    .option("--value <json...>", "Read one or more inline JSON values.")
    .action(
      (options: { file?: string | string[]; value?: string | string[] }) => {
        printValue(mergeJsonValues(readMultipleJsonSources(options)));
      }
    );

  jsonCommand
    .command("to-yaml")
    .description("Convert JSON to YAML.")
    .option("--file <path>", "Read JSON from a file.")
    .option("--value <json>", "Read JSON inline.")
    .action((options: { file?: string; value?: string }) => {
      const source = readSingleJsonSource(options);
      printValue(convertJsonToYaml(source.parsed));
    });
}
