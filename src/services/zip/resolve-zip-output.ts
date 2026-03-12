import path from "node:path";

export function resolveZipOutputPath(
  sourcePath: string,
  explicitOut?: string
): string {
  if (explicitOut) {
    return explicitOut;
  }

  const normalizedSource = path.resolve(sourcePath);
  const parsed = path.parse(normalizedSource);

  if (path.basename(normalizedSource) === ".") {
    const cwd = process.cwd();
    return path.join(cwd, `${path.basename(cwd)}.zip`);
  }

  if (parsed.ext) {
    return path.join(parsed.dir, `${parsed.name}.zip`);
  }

  return path.join(parsed.dir, `${parsed.base}.zip`);
}
