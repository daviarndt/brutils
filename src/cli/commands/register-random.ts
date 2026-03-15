import type { Command } from "commander";

import { pickRandomNumber } from "../../services/number-picker/index.js";
import {
  flipCoin,
  generateRandomFloats,
  generateRandomIntegers,
  pickRandomItems,
  rollDice,
  shuffleRandomItems
} from "../../services/random-number/index.js";
import { type RandomOutputFormat } from "../shared/constants.js";
import { examples } from "../shared/help.js";
import { readItems } from "../shared/io.js";
import {
  parseInteger,
  parseNumber,
  parsePositiveInteger,
  parseRandomFormat
} from "../shared/parsers.js";
import { printRandomValues, printValue } from "../ui/output.js";

export function registerRandomCommands(program: Command): void {
  const randomNumber = program
    .command("random-number")
    .alias("rand")
    .description(
      "Generate random integers, floats, picks, shuffles, dice rolls and coin flips."
    )
    .addHelpText(
      "after",
      examples([
        "brutils random-number int --min 1 --max 100 --count 5 --sorted",
        "brutils random-number float --min 0 --max 1 --count 3 --precision 4",
        'brutils random-number pick --items "red,blue,green" --count 2 --unique',
        "brutils random-number shuffle --file ./items.txt",
        "brutils random-number dice --faces 20 --count 2",
        "brutils random-number coin --seed 42"
      ])
    );

  randomNumber
    .command("int")
    .alias("generate")
    .description("Generate random integers within a range.")
    .option("--min <number>", "Minimum integer value.", parseInteger)
    .option("--max <number>", "Maximum integer value.", parseInteger)
    .option(
      "--count <number>",
      "How many values to generate.",
      parsePositiveInteger,
      1
    )
    .option("--unique", "Avoid duplicates when generating multiple values.")
    .option("--sorted", "Sort the generated values in ascending order.")
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .option(
      "--format <mode>",
      "Output mode: plain, json or csv.",
      parseRandomFormat,
      "plain"
    )
    .action(
      (options: {
        min?: number;
        max?: number;
        count: number;
        unique?: boolean;
        sorted?: boolean;
        seed?: number;
        format: RandomOutputFormat;
      }) => {
        printRandomValues(generateRandomIntegers(options), options.format);
      }
    );

  randomNumber
    .command("float")
    .description("Generate random floating-point numbers within a range.")
    .option("--min <number>", "Minimum numeric value.", parseNumber)
    .option("--max <number>", "Maximum numeric value.", parseNumber)
    .option(
      "--count <number>",
      "How many values to generate.",
      parsePositiveInteger,
      1
    )
    .option("--sorted", "Sort the generated values in ascending order.")
    .option(
      "--precision <number>",
      "Number of decimal places to preserve.",
      parsePositiveInteger
    )
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .option(
      "--format <mode>",
      "Output mode: plain, json or csv.",
      parseRandomFormat,
      "plain"
    )
    .action(
      (options: {
        min?: number;
        max?: number;
        count: number;
        sorted?: boolean;
        precision?: number;
        seed?: number;
        format: RandomOutputFormat;
      }) => {
        printRandomValues(generateRandomFloats(options), options.format);
      }
    );

  randomNumber
    .command("pick")
    .description("Pick one or more items from a list.")
    .option("--items <csv>", "Comma-separated items to pick from.")
    .option(
      "--file <path>",
      "Read source items from a text file (one per line)."
    )
    .option(
      "--count <number>",
      "How many items to pick.",
      parsePositiveInteger,
      1
    )
    .option("--unique", "Avoid duplicate picks when possible.")
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .option(
      "--format <mode>",
      "Output mode: plain, json or csv.",
      parseRandomFormat,
      "plain"
    )
    .action(
      (options: {
        items?: string;
        file?: string;
        count: number;
        unique?: boolean;
        seed?: number;
        format: RandomOutputFormat;
      }) => {
        const values = pickRandomItems({
          items: readItems(options.items, options.file),
          count: options.count,
          ...(options.unique !== undefined ? { unique: options.unique } : {}),
          ...(options.seed !== undefined ? { seed: options.seed } : {})
        });

        printRandomValues(values, options.format);
      }
    );

  randomNumber
    .command("shuffle")
    .description("Shuffle a list of items.")
    .option("--items <csv>", "Comma-separated items to shuffle.")
    .option(
      "--file <path>",
      "Read source items from a text file (one per line)."
    )
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .option(
      "--format <mode>",
      "Output mode: plain, json or csv.",
      parseRandomFormat,
      "plain"
    )
    .action(
      (options: {
        items?: string;
        file?: string;
        seed?: number;
        format: RandomOutputFormat;
      }) => {
        const values = shuffleRandomItems({
          items: readItems(options.items, options.file),
          ...(options.seed !== undefined ? { seed: options.seed } : {})
        });

        printRandomValues(values, options.format);
      }
    );

  randomNumber
    .command("dice")
    .description("Roll one or more dice.")
    .option(
      "--faces <number>",
      "Number of faces on the die.",
      parsePositiveInteger,
      6
    )
    .option(
      "--count <number>",
      "How many rolls to generate.",
      parsePositiveInteger,
      1
    )
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .option(
      "--format <mode>",
      "Output mode: plain, json or csv.",
      parseRandomFormat,
      "plain"
    )
    .action(
      (options: {
        faces: number;
        count: number;
        seed?: number;
        format: RandomOutputFormat;
      }) => {
        printRandomValues(rollDice(options), options.format);
      }
    );

  randomNumber
    .command("coin")
    .description("Flip a coin once.")
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .action((options: { seed?: number }) => {
      printValue(flipCoin(options));
    });

  const numberPicker = program
    .command("number-picker")
    .alias("pick-number")
    .description("Pick a single random integer within a range.")
    .addHelpText(
      "after",
      examples([
        "brutils number-picker run --min 1 --max 10",
        "brutils number-picker run --min 100 --max 999 --seed 42"
      ])
    );

  numberPicker
    .command("run")
    .description("Pick one random integer.")
    .option("--min <number>", "Minimum integer value.", parseInteger)
    .option("--max <number>", "Maximum integer value.", parseInteger)
    .option(
      "--seed <number>",
      "Seed used for deterministic output.",
      parseInteger
    )
    .action((options: { min?: number; max?: number; seed?: number }) => {
      printValue(pickRandomNumber(options));
    });
}
