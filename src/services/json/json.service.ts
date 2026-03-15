import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type {
  JsonDiffEntry,
  JsonDiffResult,
  JsonValidationResult
} from "./json.types.js";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cloneJsonValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sortKeysDeep(item));
  }

  if (isPlainObject(value)) {
    return Object.keys(value)
      .sort((left, right) => left.localeCompare(right))
      .reduce<Record<string, unknown>>((accumulator, key) => {
        accumulator[key] = sortKeysDeep(value[key]);
        return accumulator;
      }, {});
  }

  return value;
}

function formatYamlScalar(value: unknown): string {
  if (value === null) {
    return "null";
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value === "string") {
    if (/^[A-Za-z0-9_-]+$/.test(value)) {
      return value;
    }

    return JSON.stringify(value);
  }

  return JSON.stringify(value);
}

function toYamlLines(value: unknown, depth = 0): string[] {
  const indent = "  ".repeat(depth);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [`${indent}[]`];
    }

    return value.flatMap((item) => {
      if (Array.isArray(item) || isPlainObject(item)) {
        const nested = toYamlLines(item, depth + 1);
        return [`${indent}-`, ...nested];
      }

      return [`${indent}- ${formatYamlScalar(item)}`];
    });
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value);

    if (keys.length === 0) {
      return [`${indent}{}`];
    }

    return keys.flatMap((key) => {
      const child = value[key];

      if (Array.isArray(child) || isPlainObject(child)) {
        return [`${indent}${key}:`, ...toYamlLines(child, depth + 1)];
      }

      return [`${indent}${key}: ${formatYamlScalar(child)}`];
    });
  }

  return [`${indent}${formatYamlScalar(value)}`];
}

function parsePath(path: string): string[] {
  const segments = path.match(/[^.[\]]+/g) ?? [];

  if (segments.length === 0) {
    throw new BRUtilsError("JSON path cannot be empty.");
  }

  return segments;
}

function getContainerForPath(root: unknown, segments: string[]): unknown {
  let current: unknown = root;

  for (const segment of segments) {
    if (Array.isArray(current)) {
      const index = Number(segment);

      if (!Number.isInteger(index)) {
        return undefined;
      }

      current = current[index];
      continue;
    }

    if (isPlainObject(current)) {
      current = current[segment];
      continue;
    }

    return undefined;
  }

  return current;
}

function appendDiffPath(basePath: string, segment: string | number): string {
  if (typeof segment === "number") {
    return `${basePath}[${segment}]`;
  }

  return basePath === "$" ? `$.${segment}` : `${basePath}.${segment}`;
}

function deepEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function diffValues(
  left: unknown,
  right: unknown,
  basePath = "$"
): JsonDiffEntry[] {
  if (deepEqual(left, right)) {
    return [];
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const result: JsonDiffEntry[] = [];
    const maxLength = Math.max(left.length, right.length);

    for (let index = 0; index < maxLength; index += 1) {
      if (index >= left.length) {
        result.push({
          path: appendDiffPath(basePath, index),
          type: "added",
          right: right[index]
        });
        continue;
      }

      if (index >= right.length) {
        result.push({
          path: appendDiffPath(basePath, index),
          type: "removed",
          left: left[index]
        });
        continue;
      }

      result.push(
        ...diffValues(
          left[index],
          right[index],
          appendDiffPath(basePath, index)
        )
      );
    }

    return result;
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const result: JsonDiffEntry[] = [];
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

    for (const key of Array.from(keys).sort((a, b) => a.localeCompare(b))) {
      if (!(key in left)) {
        result.push({
          path: appendDiffPath(basePath, key),
          type: "added",
          right: right[key]
        });
        continue;
      }

      if (!(key in right)) {
        result.push({
          path: appendDiffPath(basePath, key),
          type: "removed",
          left: left[key]
        });
        continue;
      }

      result.push(
        ...diffValues(left[key], right[key], appendDiffPath(basePath, key))
      );
    }

    return result;
  }

  return [
    {
      path: basePath,
      type: "changed",
      left,
      right
    }
  ];
}

function deepMerge(left: unknown, right: unknown): unknown {
  if (Array.isArray(left) && Array.isArray(right)) {
    return cloneJsonValue(right);
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const result: Record<string, unknown> = cloneJsonValue(left);

    for (const [key, value] of Object.entries(right)) {
      if (key in result) {
        result[key] = deepMerge(result[key], value);
      } else {
        result[key] = cloneJsonValue(value);
      }
    }

    return result;
  }

  return cloneJsonValue(right);
}

export function parseJsonInput(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown JSON parse error.";
    throw new BRUtilsError(message);
  }
}

export function validateJsonInput(value: string): JsonValidationResult {
  try {
    JSON.parse(value);
    return { isValid: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown JSON parse error.";
    return { isValid: false, error: message };
  }
}

export function formatJsonValue(
  value: unknown,
  indent = 2,
  sortKeys = false
): string {
  if (!Number.isInteger(indent) || indent < 0) {
    throw new BRUtilsError("Indent must be a non-negative integer.");
  }

  const normalized = sortKeys ? sortKeysDeep(value) : value;
  return JSON.stringify(normalized, null, indent);
}

export function minifyJsonValue(value: unknown): string {
  return JSON.stringify(value);
}

export function getJsonPathValue(value: unknown, path: string): unknown {
  return getContainerForPath(value, parsePath(path));
}

export function setJsonPathValue(
  value: unknown,
  path: string,
  newValue: unknown
): unknown {
  const root = cloneJsonValue(value);
  const segments = parsePath(path);
  let current: unknown = root;

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const nextSegment = segments[index + 1];
    const nextShouldBeArray =
      nextSegment !== undefined && /^\d+$/.test(nextSegment);

    if (Array.isArray(current)) {
      const currentIndex = Number(segment);

      if (!Number.isInteger(currentIndex)) {
        throw new BRUtilsError(`Invalid array index in path: ${segment}`);
      }

      if (isLast) {
        current[currentIndex] = newValue;
        return;
      }

      if (current[currentIndex] === undefined) {
        current[currentIndex] = nextShouldBeArray ? [] : {};
      }

      current = current[currentIndex];
      return;
    }

    if (!isPlainObject(current)) {
      throw new BRUtilsError(`Cannot set nested path at segment: ${segment}`);
    }

    if (isLast) {
      current[segment] = newValue;
      return;
    }

    if (current[segment] === undefined) {
      current[segment] = nextShouldBeArray ? [] : {};
    }

    current = current[segment];
  });

  return root;
}

export function deleteJsonPathValue(value: unknown, path: string): unknown {
  const root = cloneJsonValue(value);
  const segments = parsePath(path);
  const parent = getContainerForPath(root, segments.slice(0, -1));
  const lastSegment = segments[segments.length - 1]!;

  if (Array.isArray(parent)) {
    const index = Number(lastSegment);

    if (!Number.isInteger(index)) {
      throw new BRUtilsError(`Invalid array index in path: ${lastSegment}`);
    }

    parent.splice(index, 1);
    return root;
  }

  if (isPlainObject(parent)) {
    delete parent[lastSegment];
    return root;
  }

  if (segments.length === 1 && isPlainObject(root)) {
    delete root[lastSegment];
    return root;
  }

  throw new BRUtilsError(`Path not found: ${path}`);
}

export function diffJsonValues(left: unknown, right: unknown): JsonDiffResult {
  const changes = diffValues(left, right);
  return {
    isEqual: changes.length === 0,
    changes
  };
}

export function mergeJsonValues(values: unknown[]): unknown {
  if (values.length < 2) {
    throw new BRUtilsError("Merge requires at least two JSON sources.");
  }

  return values.slice(1).reduce((accumulator, current) => {
    return deepMerge(accumulator, current);
  }, cloneJsonValue(values[0]));
}

export function convertJsonToYaml(value: unknown): string {
  return toYamlLines(value).join("\n");
}
