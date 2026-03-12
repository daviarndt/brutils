import path from "node:path";

export function resolveUnzipOutputPath(
  sourcePath: string,
  explicitOut?: string
): string {
  if (explicitOut) {
    return explicitOut;
  }

  const resolvedSource = path.resolve(sourcePath);
  const parsed = path.parse(resolvedSource);

  return path.join(parsed.dir, parsed.name);
}
