import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type {
  ExtractTextOptions,
  PadTextOptions,
  ReplaceTextOptions,
  StringCaseStyle,
  StringCodecMode,
  StringPadSide,
  TruncateTextOptions
} from "./str.types.js";

function ensureNonNegativeInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new BRUtilsError(`${label} must be a non-negative integer.`);
  }
}

function splitWords(value: string): string[] {
  return value
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function capitalize(word: string): string {
  if (word.length === 0) {
    return word;
  }

  return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
}

function encodeHtmlEntities(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function buildGlobalRegex(pattern: string): RegExp {
  try {
    return new RegExp(pattern, "g");
  } catch {
    throw new BRUtilsError(`Invalid regex pattern: ${pattern}`);
  }
}

function extractUsingDelimiters(value: string, query: string): string[] {
  const separatorIndex = query.indexOf("|");

  if (separatorIndex === -1) {
    throw new BRUtilsError(
      'Delimiter extraction expects a query in the format "start|end".'
    );
  }

  const startDelimiter = query.slice(0, separatorIndex);
  const endDelimiter = query.slice(separatorIndex + 1);

  if (startDelimiter.length === 0 || endDelimiter.length === 0) {
    throw new BRUtilsError(
      "Delimiter extraction expects non-empty start and end delimiters."
    );
  }

  const matches: string[] = [];
  let cursor = 0;

  while (cursor < value.length) {
    const startIndex = value.indexOf(startDelimiter, cursor);

    if (startIndex === -1) {
      break;
    }

    const contentStart = startIndex + startDelimiter.length;
    const endIndex = value.indexOf(endDelimiter, contentStart);

    if (endIndex === -1) {
      break;
    }

    matches.push(value.slice(contentStart, endIndex));
    cursor = endIndex + endDelimiter.length;
  }

  return matches;
}

export function slugifyText(value: string): string {
  return removeAccents(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function convertStringCase(
  value: string,
  style: StringCaseStyle
): string {
  const words = splitWords(value);

  if (words.length === 0) {
    return "";
  }

  switch (style) {
    case "camel":
      return words[0]! + words.slice(1).map(capitalize).join("");
    case "snake":
      return words.join("_");
    case "kebab":
      return words.join("-");
    case "pascal":
      return words.map(capitalize).join("");
    case "constant":
      return words.join("_").toUpperCase();
    case "title":
      return words.map(capitalize).join(" ");
  }
}

export function trimText(value: string): string {
  return value.trim();
}

export function truncateText(
  value: string,
  options: TruncateTextOptions
): string {
  ensureNonNegativeInteger(options.max, "Maximum length");

  if (value.length <= options.max) {
    return value;
  }

  const suffix = options.suffix ?? "";

  if (suffix.length >= options.max) {
    return suffix.slice(0, options.max);
  }

  return value.slice(0, options.max - suffix.length) + suffix;
}

export function replaceText(
  value: string,
  options: ReplaceTextOptions
): string {
  if (options.regex) {
    return value.replace(buildGlobalRegex(options.from), options.with);
  }

  return value.replaceAll(options.from, options.with);
}

export function normalizeText(value: string): string {
  return value.normalize("NFC");
}

export function removeAccents(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function padText(value: string, options: PadTextOptions): string {
  ensureNonNegativeInteger(options.length, "Target length");

  const side: StringPadSide = options.side ?? "right";

  if (value.length >= options.length) {
    return value;
  }

  switch (side) {
    case "left":
      return value.padStart(options.length);
    case "right":
      return value.padEnd(options.length);
    case "both": {
      const totalPadding = options.length - value.length;
      const leftPadding = Math.floor(totalPadding / 2);
      const rightPadding = totalPadding - leftPadding;
      return `${" ".repeat(leftPadding)}${value}${" ".repeat(rightPadding)}`;
    }
  }
}

export function extractText(
  value: string,
  query: string,
  options: ExtractTextOptions = {}
): string[] {
  if (options.regex) {
    const matches = Array.from(value.matchAll(buildGlobalRegex(query)));

    return matches.flatMap((match) => {
      const groups = match
        .slice(1)
        .filter((group): group is string => group !== undefined);
      return groups.length > 0 ? groups : [match[0]];
    });
  }

  return extractUsingDelimiters(value, query);
}

export function transformBase64(
  value: string,
  mode: StringCodecMode = "encode"
): string {
  if (mode === "decode") {
    return Buffer.from(value, "base64").toString("utf-8");
  }

  return Buffer.from(value, "utf-8").toString("base64");
}

export function transformUrlEncoding(
  value: string,
  mode: StringCodecMode = "encode"
): string {
  if (mode === "decode") {
    return decodeURIComponent(value);
  }

  return encodeURIComponent(value);
}

export function transformHtmlEntities(
  value: string,
  mode: StringCodecMode = "encode"
): string {
  if (mode === "decode") {
    return decodeHtmlEntities(value);
  }

  return encodeHtmlEntities(value);
}
