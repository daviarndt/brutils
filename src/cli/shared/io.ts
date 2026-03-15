import fs from "node:fs";

import { parseJsonInput } from "../../services/json/index.js";

export function readTextSource(options: {
  text?: string;
  file?: string;
}): string {
  if (options.text && options.file) {
    throw new Error("Use either --text or --file, not both.");
  }

  if (options.text !== undefined) {
    return options.text;
  }

  if (options.file) {
    return fs.readFileSync(options.file, "utf-8");
  }

  throw new Error("One of --text or --file is required.");
}

export function normalizeStringList(value?: string | string[]): string[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export function readSingleJsonSource(options: {
  file?: string;
  value?: string;
}): {
  sourcePath?: string;
  raw: string;
  parsed: unknown;
} {
  if (options.file && options.value) {
    throw new Error("Use either --file or --value, not both.");
  }

  if (options.file) {
    const raw = fs.readFileSync(options.file, "utf-8");

    return {
      sourcePath: options.file,
      raw,
      parsed: parseJsonInput(raw)
    };
  }

  if (options.value !== undefined) {
    return {
      raw: options.value,
      parsed: parseJsonInput(options.value)
    };
  }

  throw new Error("One of --file or --value is required.");
}

export function readMultipleJsonSources(options: {
  file?: string | string[];
  value?: string | string[];
}): unknown[] {
  const fileValues = normalizeStringList(options.file);
  const inlineValues = normalizeStringList(options.value);

  if (fileValues.length + inlineValues.length < 2) {
    throw new Error(
      "Provide at least two JSON sources via --file and/or --value."
    );
  }

  return [
    ...fileValues.map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf-8");
      return parseJsonInput(raw);
    }),
    ...inlineValues.map((value) => parseJsonInput(value))
  ];
}

export function readDiffJsonSource(value: string): unknown {
  if (fs.existsSync(value) && fs.statSync(value).isFile()) {
    return parseJsonInput(fs.readFileSync(value, "utf-8"));
  }

  return parseJsonInput(value);
}

export function writeTextFile(pathValue: string, content: string): void {
  fs.writeFileSync(pathValue, content, "utf-8");
}

export function readItems(items?: string, file?: string): string[] {
  if (items && file) {
    throw new Error("Use either --items or --file, not both.");
  }

  if (!items && !file) {
    throw new Error("One of --items or --file is required.");
  }

  if (items) {
    const parsed = items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (parsed.length === 0) {
      throw new Error("The --items value did not produce any usable items.");
    }

    return parsed;
  }

  const content = fs.readFileSync(file!, "utf-8");
  const parsed = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (parsed.length === 0) {
    throw new Error(
      "The file passed to --file did not contain any usable items."
    );
  }

  return parsed;
}
