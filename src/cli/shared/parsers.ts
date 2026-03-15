import { InvalidArgumentError } from "commander";

import type { CEPStateCode } from "../../services/cep/index.js";
import type { CPFStateCode } from "../../services/cpf/index.js";
import type { CreditCardBrand } from "../../services/credit-card/index.js";
import type {
  StringCaseStyle,
  StringCodecMode,
  StringPadSide
} from "../../services/str/index.js";
import {
  BRAZILIAN_STATES,
  CARD_BRANDS,
  RANDOM_OUTPUT_FORMATS,
  STRING_CASE_STYLES,
  STRING_CODEC_MODES,
  STRING_PAD_SIDES,
  type RandomOutputFormat,
  type StringCaseStyleOption,
  type StringCodecModeOption,
  type StringPadSideOption
} from "./constants.js";

export function parseInteger(value: string): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new InvalidArgumentError(`Expected an integer, received "${value}".`);
  }

  return parsed;
}

export function parsePositiveInteger(value: string): number {
  const parsed = parseInteger(value);

  if (parsed < 1) {
    throw new InvalidArgumentError(
      `Expected a positive integer, received "${value}".`
    );
  }

  return parsed;
}

export function parseNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new InvalidArgumentError(
      `Expected a numeric value, received "${value}".`
    );
  }

  return parsed;
}

export function parseState(value: string): CPFStateCode | CEPStateCode {
  const normalized = value.toUpperCase();

  if (
    !BRAZILIAN_STATES.includes(normalized as (typeof BRAZILIAN_STATES)[number])
  ) {
    throw new InvalidArgumentError(
      `Invalid state "${value}". Use one of: ${BRAZILIAN_STATES.join(", ")}.`
    );
  }

  return normalized as CPFStateCode | CEPStateCode;
}

export function parseCardBrand(value: string): CreditCardBrand {
  const normalized = value.toLowerCase();

  if (!CARD_BRANDS.includes(normalized as CreditCardBrand)) {
    throw new InvalidArgumentError(
      `Invalid brand "${value}". Use one of: ${CARD_BRANDS.join(", ")}.`
    );
  }

  return normalized as CreditCardBrand;
}

export function parseRandomFormat(value: string): RandomOutputFormat {
  const normalized = value.toLowerCase();

  if (!RANDOM_OUTPUT_FORMATS.includes(normalized as RandomOutputFormat)) {
    throw new InvalidArgumentError(
      `Invalid output format "${value}". Use one of: ${RANDOM_OUTPUT_FORMATS.join(", ")}.`
    );
  }

  return normalized as RandomOutputFormat;
}

export function parseStringCaseStyle(value: string): StringCaseStyle {
  const normalized = value.toLowerCase();

  if (!STRING_CASE_STYLES.includes(normalized as StringCaseStyleOption)) {
    throw new InvalidArgumentError(
      `Invalid string case style "${value}". Use one of: ${STRING_CASE_STYLES.join(", ")}.`
    );
  }

  return normalized as StringCaseStyle;
}

export function parseStringCodecMode(value: string): StringCodecMode {
  const normalized = value.toLowerCase();

  if (!STRING_CODEC_MODES.includes(normalized as StringCodecModeOption)) {
    throw new InvalidArgumentError(
      `Invalid codec mode "${value}". Use one of: ${STRING_CODEC_MODES.join(", ")}.`
    );
  }

  return normalized as StringCodecMode;
}

export function parseStringPadSide(value: string): StringPadSide {
  const normalized = value.toLowerCase();

  if (!STRING_PAD_SIDES.includes(normalized as StringPadSideOption)) {
    throw new InvalidArgumentError(
      `Invalid pad side "${value}". Use one of: ${STRING_PAD_SIDES.join(", ")}.`
    );
  }

  return normalized as StringPadSide;
}
