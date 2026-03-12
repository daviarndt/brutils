import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createZip } from "../../src/services/zip/index.js";
import {
  extractZipFile,
  listUnzip,
  testUnzip
} from "../../src/services/unzip/index.js";

const tempRoots: string[] = [];

function createTempDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "brutils-unzip-"));
  tempRoots.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tempRoots.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("unzip integration", () => {
  it("should extract archives and preserve nested files", async () => {
    const workspace = createTempDir();
    const sourceDir = path.join(workspace, "source");
    const zipPath = path.join(workspace, "archive.zip");
    const outputDir = path.join(workspace, "output");

    fs.mkdirSync(path.join(sourceDir, "nested"), { recursive: true });
    fs.writeFileSync(
      path.join(sourceDir, "nested", "hello.txt"),
      "hello world"
    );
    fs.writeFileSync(path.join(sourceDir, "root.txt"), "root file");

    await createZip(sourceDir, zipPath, { contentsOnly: true });

    const plan = await extractZipFile(zipPath, outputDir, {});

    expect(plan.outputDir).toBe(path.resolve(outputDir));
    expect(
      fs.readFileSync(path.join(outputDir, "nested", "hello.txt"), "utf-8")
    ).toBe("hello world");
  });

  it("should list and test archive contents from the unzip module", async () => {
    const workspace = createTempDir();
    const sourceDir = path.join(workspace, "source");
    const zipPath = path.join(workspace, "archive.zip");

    fs.mkdirSync(sourceDir, { recursive: true });
    fs.writeFileSync(path.join(sourceDir, "one.txt"), "one");

    await createZip(sourceDir, zipPath, { contentsOnly: true });

    const entries = await listUnzip(zipPath);
    const testResult = await testUnzip(zipPath);

    expect(entries.map((entry) => entry.path)).toContain("one.txt");
    expect(testResult.ok).toBe(true);
    expect(testResult.testedEntries).toBe(1);
  });

  it("should support flat extraction with match filtering", async () => {
    const workspace = createTempDir();
    const sourceDir = path.join(workspace, "source");
    const zipPath = path.join(workspace, "archive.zip");
    const outputDir = path.join(workspace, "flat-output");

    fs.mkdirSync(path.join(sourceDir, "nested"), { recursive: true });
    fs.writeFileSync(
      path.join(sourceDir, "nested", "hello.txt"),
      "hello world"
    );
    fs.writeFileSync(
      path.join(sourceDir, "nested", "ignored.log"),
      "ignore me"
    );

    await createZip(sourceDir, zipPath, { contentsOnly: true });
    await extractZipFile(zipPath, outputDir, { flat: true, match: "**/*.txt" });

    expect(fs.existsSync(path.join(outputDir, "hello.txt"))).toBe(true);
    expect(fs.existsSync(path.join(outputDir, "ignored.log"))).toBe(false);
  });
});
