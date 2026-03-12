# ZIP

## Overview

The ZIP module creates `.zip` files from source files or directories.

## Available Command

```bash
npm run zip:run -- <source> [out] [options]
```

## Positional Arguments

| Argument   | Required | Description                    | Example                                           |
| ---------- | -------- | ------------------------------ | ------------------------------------------------- |
| `<source>` | Yes      | File or directory to compress. | `npm run zip:run -- ./dist`                       |
| `[out]`    | No       | Output `.zip` file path.       | `npm run zip:run -- ./dist ./artifacts/build.zip` |

## Flags

| Flag                      | Type              | Required | Description                                                  | Example                                                  |
| ------------------------- | ----------------- | -------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `-o, --out <file>`        | string            | No       | Sets the exact output file path.                             | `npm run zip:run -- ./dist --out ./artifacts/build.zip`  |
| `-l, --level <0-9>`       | integer           | No       | Compression level. Default is `9`.                           | `npm run zip:run -- ./dist --level 5`                    |
| `-f, --force`             | boolean           | No       | Overwrites the output file if it already exists.             | `npm run zip:run -- ./dist -f`                           |
| `-x, --exclude <pattern>` | repeatable string | No       | Excludes file patterns from the zip operation.               | `npm run zip:run -- . -x "node_modules/**" -x ".git/**"` |
| `--contents-only`         | boolean           | No       | Includes only directory contents instead of the root folder. | `npm run zip:run -- ./dist --contents-only`              |
| `--dry-run`               | boolean           | No       | Shows the execution plan without creating the zip file.      | `npm run zip:run -- ./dist --dry-run`                    |
| `-v, --verbose`           | boolean           | No       | Shows detailed logs.                                         | `npm run zip:run -- ./dist -v`                           |
| `-q, --quiet`             | boolean           | No       | Reduces terminal output.                                     | `npm run zip:run -- ./dist -q`                           |

## Notes

- Use either positional `[out]` or `--out`, not both.
- By default, directory compression keeps the root folder in the zip.
- Use `--contents-only` if you want only the directory contents at the zip root.
- If the output file already exists, the command fails unless `--force` is used.
