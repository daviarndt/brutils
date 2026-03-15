import type { Command } from "commander";

import {
  formatCEPValue,
  generateCEP,
  generateCEPBatch,
  maskCEP,
  stripCEP,
  validateCEP,
  type CEPStateCode
} from "../../services/cep/index.js";
import {
  formatCNPJValue,
  generateCNPJ,
  generateCNPJBatch,
  maskCNPJ,
  stripCNPJ,
  validateCNPJ
} from "../../services/cnpj/index.js";
import {
  formatCPFValue,
  generateCPF,
  generateCPFBatch,
  maskCPF,
  stripCPF,
  validateCPF,
  type CPFStateCode
} from "../../services/cpf/index.js";
import {
  detectCreditCardBrand,
  generateCreditCard,
  validateCreditCard,
  type CreditCardBrand
} from "../../services/credit-card/index.js";
import { examples } from "../shared/help.js";
import {
  parseCardBrand,
  parsePositiveInteger,
  parseState
} from "../shared/parsers.js";
import { printValue } from "../ui/output.js";

export function registerBrazilianCommands(program: Command): void {
  const cpf = program
    .command("cpf")
    .description("Generate, validate, format, strip and mask CPF values.")
    .addHelpText(
      "after",
      examples([
        "brutils cpf generate --formatted",
        "brutils cpf generate --formatted --state SP --count 5 --unique",
        "brutils cpf validate 52998224725 --strict",
        "brutils cpf format 52998224725",
        "brutils cpf strip 529.982.247-25",
        'brutils cpf mask 52998224725 --mask "***.###.***-##"'
      ])
    );

  cpf
    .command("generate")
    .description("Generate synthetic valid CPF values.")
    .option("--formatted", "Return generated values with CPF punctuation.")
    .option(
      "--state <uf>",
      "Bias the region digit using a Brazilian state code.",
      parseState
    )
    .option(
      "--count <number>",
      "Generate multiple CPFs.",
      parsePositiveInteger,
      1
    )
    .option("--unique", "Avoid duplicates during batch generation.")
    .action(
      (options: {
        formatted?: boolean;
        state?: CPFStateCode;
        count: number;
        unique?: boolean;
      }) => {
        const values =
          options.count > 1
            ? generateCPFBatch({
                formatted: options.formatted,
                state: options.state,
                count: options.count,
                unique: options.unique
              })
            : [
                generateCPF({
                  formatted: options.formatted,
                  state: options.state
                })
              ];

        printValue(values);
      }
    );

  cpf
    .command("validate")
    .argument("<value>", "CPF value to validate.")
    .description(
      "Validate a CPF using size, check digits and optional strict repeated-pattern rejection."
    )
    .option("--strict", "Reject repeated patterns such as 11111111111.")
    .action((value: string, options: { strict?: boolean }) => {
      printValue(validateCPF(value, { strict: options.strict }));
    });

  cpf
    .command("format")
    .argument("<value>", "CPF value to format.")
    .description("Format a CPF as 000.000.000-00.")
    .action((value: string) => {
      printValue(formatCPFValue(value));
    });

  cpf
    .command("strip")
    .argument("<value>", "CPF value to normalize to digits only.")
    .description("Remove punctuation and keep digits only.")
    .action((value: string) => {
      printValue(stripCPF(value));
    });

  cpf
    .command("mask")
    .argument("<value>", "CPF value to mask.")
    .description("Mask a CPF for safe display.")
    .option(
      "--mask <pattern>",
      'Custom mask. Use "*" to hide digits and "#" to reveal them.'
    )
    .action((value: string, options: { mask?: string }) => {
      printValue(maskCPF(value, { pattern: options.mask }));
    });

  const cnpj = program
    .command("cnpj")
    .description("Generate, validate, format, strip and mask CNPJ values.")
    .addHelpText(
      "after",
      examples([
        "brutils cnpj generate --formatted",
        "brutils cnpj generate --branch 12 --count 3 --unique",
        "brutils cnpj validate 11.444.777/0001-61 --strict",
        "brutils cnpj format 11444777000161",
        "brutils cnpj strip 11.444.777/0001-61",
        'brutils cnpj mask 11444777000161 --mask "##.***.***/****-##"'
      ])
    );

  cnpj
    .command("generate")
    .description("Generate synthetic valid CNPJ values.")
    .option("--formatted", "Return generated values with CNPJ punctuation.")
    .option(
      "--branch <number>",
      "Force a branch identifier. Values are left-padded to 4 digits."
    )
    .option(
      "--count <number>",
      "Generate multiple CNPJs.",
      parsePositiveInteger,
      1
    )
    .option("--unique", "Avoid duplicates during batch generation.")
    .action(
      (options: {
        formatted?: boolean;
        branch?: string;
        count: number;
        unique?: boolean;
      }) => {
        const values =
          options.count > 1
            ? generateCNPJBatch({
                formatted: options.formatted,
                branch: options.branch,
                count: options.count,
                unique: options.unique
              })
            : [
                generateCNPJ({
                  formatted: options.formatted,
                  branch: options.branch
                })
              ];

        printValue(values);
      }
    );

  cnpj
    .command("validate")
    .argument("<value>", "CNPJ value to validate.")
    .description(
      "Validate a CNPJ using size, check digits and optional strict repeated-pattern rejection."
    )
    .option("--strict", "Reject repeated patterns such as 00000000000000.")
    .action((value: string, options: { strict?: boolean }) => {
      printValue(validateCNPJ(value, { strict: options.strict }));
    });

  cnpj
    .command("format")
    .argument("<value>", "CNPJ value to format.")
    .description("Format a CNPJ as 00.000.000/0000-00.")
    .action((value: string) => {
      printValue(formatCNPJValue(value));
    });

  cnpj
    .command("strip")
    .argument("<value>", "CNPJ value to normalize to digits only.")
    .description("Remove punctuation and keep digits only.")
    .action((value: string) => {
      printValue(stripCNPJ(value));
    });

  cnpj
    .command("mask")
    .argument("<value>", "CNPJ value to mask.")
    .description("Mask a CNPJ for safe display.")
    .option(
      "--mask <pattern>",
      'Custom mask. Use "*" to hide digits and "#" to reveal them.'
    )
    .action((value: string, options: { mask?: string }) => {
      printValue(maskCNPJ(value, { pattern: options.mask }));
    });

  const cep = program
    .command("cep")
    .description("Generate, validate, format, strip and mask CEP values.")
    .addHelpText(
      "after",
      examples([
        "brutils cep generate --formatted",
        "brutils cep generate --state PR --count 5",
        "brutils cep validate 86010-190 --strict",
        "brutils cep format 86010190",
        "brutils cep strip 86010-190",
        'brutils cep mask 86010190 --mask "###**-***"'
      ])
    );

  cep
    .command("generate")
    .description("Generate synthetic CEP values for testing.")
    .option("--formatted", "Return generated values with CEP punctuation.")
    .option(
      "--state <uf>",
      "Bias the leading digit using a Brazilian state code.",
      parseState
    )
    .option(
      "--count <number>",
      "Generate multiple CEP values.",
      parsePositiveInteger,
      1
    )
    .action(
      (options: {
        formatted?: boolean;
        state?: CEPStateCode;
        count: number;
      }) => {
        const values =
          options.count > 1
            ? generateCEPBatch({
                formatted: options.formatted,
                state: options.state,
                count: options.count
              })
            : [
                generateCEP({
                  formatted: options.formatted,
                  state: options.state
                })
              ];

        printValue(values);
      }
    );

  cep
    .command("validate")
    .argument("<value>", "CEP value to validate.")
    .description(
      "Validate CEP structure and optional strict repeated-pattern rejection."
    )
    .option("--strict", "Reject repeated patterns such as 11111111.")
    .action((value: string, options: { strict?: boolean }) => {
      printValue(validateCEP(value, { strict: options.strict }));
    });

  cep
    .command("format")
    .argument("<value>", "CEP value to format.")
    .description("Format a CEP as 00000-000.")
    .action((value: string) => {
      printValue(formatCEPValue(value));
    });

  cep
    .command("strip")
    .argument("<value>", "CEP value to normalize to digits only.")
    .description("Remove punctuation and keep digits only.")
    .action((value: string) => {
      printValue(stripCEP(value));
    });

  cep
    .command("mask")
    .argument("<value>", "CEP value to mask.")
    .description("Mask a CEP for safe display.")
    .option(
      "--mask <pattern>",
      'Custom mask. Use "*" to hide digits and "#" to reveal them.'
    )
    .action((value: string, options: { mask?: string }) => {
      printValue(maskCEP(value, { pattern: options.mask }));
    });

  const creditCard = program
    .command("credit-card")
    .alias("card")
    .description("Generate, validate and detect test credit card data.")
    .addHelpText(
      "after",
      examples([
        "brutils credit-card generate --brand visa --formatted",
        "brutils credit-card validate --number 4111111111111111 --expiry 12/30 --cvv 123",
        "brutils credit-card validate --number 4111111111111111 --expiry-month 12 --expiry-year 30 --cvv 123",
        "brutils credit-card detect 4111111111111111"
      ])
    );

  creditCard
    .command("generate")
    .description("Generate synthetic card test data.")
    .option("--brand <brand>", "Card brand to generate.", parseCardBrand)
    .option("--formatted", "Return the card number with spaces every 4 digits.")
    .option(
      "--expiry-years-ahead <number>",
      "Maximum number of years ahead for generated expiry.",
      parsePositiveInteger
    )
    .action(
      (options: {
        brand?: CreditCardBrand;
        formatted?: boolean;
        expiryYearsAhead?: number;
      }) => {
        printValue(generateCreditCard(options));
      }
    );

  creditCard
    .command("validate")
    .description("Validate card number, expiry and CVV.")
    .requiredOption("--number <value>", "Card number to validate.")
    .option("--expiry <value>", "Expiry in MM/YY format.")
    .option("--expiry-month <value>", "Expiry month.")
    .option("--expiry-year <value>", "Expiry year.")
    .requiredOption("--cvv <value>", "CVV to validate.")
    .action(
      (options: {
        number: string;
        expiry?: string;
        expiryMonth?: string;
        expiryYear?: string;
        cvv: string;
      }) => {
        printValue(validateCreditCard(options));
      }
    );

  creditCard
    .command("detect")
    .argument("<number>", "Card number to inspect.")
    .description("Detect the card brand from a card number.")
    .action((number: string) => {
      printValue(detectCreditCardBrand(number));
    });
}
