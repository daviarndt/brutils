# ZIP

## Overview

The ZIP module creates `.zip` files from source files or directories and can also list or test zip archives.

## Available Commands

### Create a zip archive

```bash
npm run zip:create -- ./dist
npm run zip:run -- ./dist
```

### List zip contents

```bash
npm run zip:list -- ./build.zip
```

### Test archive readability

```bash
npm run zip:test -- ./build.zip
```

## Actions

| Action   | Script                                             | Description                            |
| -------- | -------------------------------------------------- | -------------------------------------- |
| `create` | `npm run zip:create -- <source> [out] [options]`   | Creates a zip file.                    |
| `list`   | `npm run zip:list -- <source> [--match <pattern>]` | Lists zip contents without extracting. |
| `test`   | `npm run zip:test -- <source> [--match <pattern>]` | Validates archive readability.         |

## Positional Arguments

| Argument   | Applies to     | Required | Description                      | Example                                              |
| ---------- | -------------- | -------- | -------------------------------- | ---------------------------------------------------- |
| `<source>` | `create`       | Yes      | File or directory to compress.   | `npm run zip:create -- ./dist`                       |
| `[out]`    | `create`       | No       | Output `.zip` file path.         | `npm run zip:create -- ./dist ./artifacts/build.zip` |
| `<source>` | `list`, `test` | Yes      | Existing `.zip` file to inspect. | `npm run zip:list -- ./build.zip`                    |

## Flags

| Flag                      | Applies to               | Type              | Description                                   | Example                                                     |
| ------------------------- | ------------------------ | ----------------- | --------------------------------------------- | ----------------------------------------------------------- |
| `-o, --out <file>`        | `create`                 | string            | Sets output file path.                        | `npm run zip:create -- ./dist --out ./artifacts/build.zip`  |
| `-l, --level <0-9>`       | `create`                 | integer           | Compression level.                            | `npm run zip:create -- ./dist --level 5`                    |
| `-f, --force`             | `create`                 | boolean           | Overwrites existing output if allowed.        | `npm run zip:create -- ./dist -f`                           |
| `-x, --exclude <pattern>` | `create`                 | repeatable string | Excludes matched files.                       | `npm run zip:create -- . -x "node_modules/**" -x ".git/**"` |
| `--contents-only`         | `create`                 | boolean           | Includes only directory contents.             | `npm run zip:create -- ./dist --contents-only`              |
| `--dry-run`               | `create`                 | boolean           | Shows the plan without writing the archive.   | `npm run zip:create -- ./dist --dry-run`                    |
| `-v, --verbose`           | `create`, `list`, `test` | boolean           | Detailed logs.                                | `npm run zip:create -- ./dist -v`                           |
| `-q, --quiet`             | `create`, `list`, `test` | boolean           | Reduced output.                               | `npm run zip:list -- ./build.zip -q`                        |
| `--follow-symlinks`       | `create`                 | boolean           | Follows symlinks while archiving.             | `npm run zip:create -- ./dist --follow-symlinks`            |
| `--store`                 | `create`                 | boolean           | Disables compression and stores files only.   | `npm run zip:create -- ./dist --store`                      |
| `--match <pattern>`       | `list`, `test`           | string            | Filters which archive entries are considered. | `npm run zip:list -- ./build.zip --match "**/*.txt"`        |

## Notes

- Use either positional `[out]` or `--out`, not both.
- `zip:run` remains available as an alias for `zip:create`.
- By default, directory compression keeps the root folder in the archive unless `--contents-only` is used.
