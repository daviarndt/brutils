import { describe, expect, it } from "vitest";
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
} from "../../src/services/json/index.js";

describe("json service", () => {
  it("should format and minify JSON", () => {
    const value = parseJsonInput('{"b":2,"a":1}');

    expect(formatJsonValue(value, 2, true)).toBe(`{
  "a": 1,
  "b": 2
}`);
    expect(minifyJsonValue(value)).toBe('{"b":2,"a":1}');
  });

  it("should validate JSON input", () => {
    expect(validateJsonInput('{"ok":true}')).toEqual({ isValid: true });
    expect(validateJsonInput("{invalid json}").isValid).toBe(false);
  });

  it("should get, set and delete JSON paths", () => {
    const value = parseJsonInput(
      '{"server":{"port":3000},"flags":{"dev":false}}'
    );

    expect(getJsonPathValue(value, "server.port")).toBe(3000);

    const updated = setJsonPathValue(value, "flags.dev", true);
    expect(getJsonPathValue(updated, "flags.dev")).toBe(true);

    const cleaned = deleteJsonPathValue(updated, "flags.dev") as {
      flags: Record<string, unknown>;
    };
    expect(cleaned.flags.dev).toBeUndefined();
  });

  it("should diff JSON values", () => {
    const left = parseJsonInput('{"name":"brutils","version":1}');
    const right = parseJsonInput('{"name":"brutils","version":2,"dev":true}');

    const result = diffJsonValues(left, right);

    expect(result.isEqual).toBe(false);
    expect(result.changes).toEqual([
      {
        path: "$.dev",
        type: "added",
        right: true
      },
      {
        path: "$.version",
        type: "changed",
        left: 1,
        right: 2
      }
    ]);
  });

  it("should merge JSON sources", () => {
    const merged = mergeJsonValues([
      parseJsonInput('{"name":"brutils","flags":{"dev":false}}'),
      parseJsonInput('{"flags":{"dev":true},"version":"0.3.0"}')
    ]) as { name: string; flags: { dev: boolean }; version: string };

    expect(merged).toEqual({
      name: "brutils",
      flags: { dev: true },
      version: "0.3.0"
    });
  });

  it("should convert JSON to YAML", () => {
    const yaml = convertJsonToYaml(
      parseJsonInput('{"name":"brutils","flags":{"dev":true},"items":[1,2]}')
    );

    expect(yaml).toContain("name: brutils");
    expect(yaml).toContain("flags:");
    expect(yaml).toContain("dev: true");
    expect(yaml).toContain("items:");
    expect(yaml).toContain("- 1");
  });
});
