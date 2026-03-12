import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createZip, listZip, testZip } from "../../src/services/zip/index.js";

const tempRoots: string[] = [];

function createTempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "brutils-zip-"));
  tempRoots.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tempRoots.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("zip integration", () => {
  it("should create, list, and test a zip archive", async () => {
    const workspace = createTempDir();
    const sourceDir = path.join(workspace, "source");
    const outputPath = path.join(workspace, "archive.zip");

    fs.mkdirSync(path.join(sourceDir, "nested"), { recursive: true });
    fs.writeFileSync(
      path.join(sourceDir, "nested", "hello.txt"),
      "hello world"
    );
    fs.writeFileSync(path.join(sourceDir, "root.txt"), "root file");

    const plan = await createZip(sourceDir, outputPath, { contentsOnly: true });
    const entries = await listZip(plan.outputPath);
    const testResult = await testZip(plan.outputPath);

    expect(fs.existsSync(plan.outputPath)).toBe(true);
    expect(entries.map((entry) => entry.path)).toContain("nested/hello.txt");
    expect(entries.map((entry) => entry.path)).toContain("root.txt");
    expect(testResult.ok).toBe(true);
    expect(testResult.testedEntries).toBe(2);
  });

  it("should support dry-run execution plans", async () => {
    const workspace = createTempDir();
    const sourceDir = path.join(workspace, "dist");

    fs.mkdirSync(sourceDir, { recursive: true });
    fs.writeFileSync(path.join(sourceDir, "file.txt"), "content");

    const plan = await createZip(sourceDir, undefined, {
      dryRun: true,
      store: true
    });

    expect(plan.store).toBe(true);
    expect(plan.outputPath.endsWith("dist.zip")).toBe(true);
  });
});
