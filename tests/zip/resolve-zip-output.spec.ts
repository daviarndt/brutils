import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveZipOutputPath } from "../../src/services/zip/resolve-zip-output.js";

describe("resolveZipOutputPath", () => {
  it("should resolve a zip file for a source file", () => {
    const result = resolveZipOutputPath("./src/index.ts");
    expect(result.endsWith(path.join("src", "index.zip"))).toBe(true);
  });

  it("should resolve a zip file for a source directory", () => {
    const result = resolveZipOutputPath("./dist");
    expect(result.endsWith("dist.zip")).toBe(true);
  });

  it("should use explicit output when provided", () => {
    const result = resolveZipOutputPath("./dist", "./artifacts/build.zip");
    expect(result).toBe("./artifacts/build.zip");
  });
});
