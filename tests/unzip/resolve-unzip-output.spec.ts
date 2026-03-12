import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveUnzipOutputPath } from "../../src/services/unzip/resolve-unzip-output.js";

describe("resolveUnzipOutputPath", () => {
  it("should resolve folder from zip file name", () => {
    const result = resolveUnzipOutputPath("./build.zip");
    expect(result.endsWith("build")).toBe(true);
  });

  it("should use explicit output when provided", () => {
    const result = resolveUnzipOutputPath("./build.zip", "./output");
    expect(result).toBe("./output");
  });
});
