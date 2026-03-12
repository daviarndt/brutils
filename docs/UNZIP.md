# UNZIP

## Overview

The UNZIP module extracts `.zip` files into a destination directory and can also list or test archive contents.

## Available Commands

### Extract a zip archive

```bash
npm run unzip:extract -- ./build.zip
npm run unzip:run -- ./build.zip
```

### List archive contents

```bash
npm run unzip:list -- ./build.zip
```

### Test archive readability

```bash
npm run unzip:test -- ./build.zip
```

## Actions

| Action    | Script                                               | Description                    |
| --------- | ---------------------------------------------------- | ------------------------------ |
| `extract` | `npm run unzip:extract -- <source> [out] [options]`  | Extracts a zip file.           |
| `list`    | `npm run unzip:list -- <source> [--match <pattern>]` | Lists zip contents.            |
| `test`    | `npm run unzip:test -- <source> [--match <pattern>]` | Validates archive readability. |

## Positional Arguments

| Argument   | Applies to                | Required | Description                        | Example                                         |
| ---------- | ------------------------- | -------- | ---------------------------------- | ----------------------------------------------- |
| `<source>` | `extract`, `list`, `test` | Yes      | `.zip` file to inspect or extract. | `npm run unzip:extract -- ./build.zip`          |
| `[out]`    | `extract`                 | No       | Destination directory.             | `npm run unzip:extract -- ./build.zip ./output` |

## Flags

| Flag                | Applies to                | Type    | Description                              | Example                                                   |
| ------------------- | ------------------------- | ------- | ---------------------------------------- | --------------------------------------------------------- |
| `-o, --out <dir>`   | `extract`                 | string  | Sets destination directory.              | `npm run unzip:extract -- ./build.zip --out ./output`     |
| `-f, --force`       | `extract`                 | boolean | Overwrites destination if allowed.       | `npm run unzip:extract -- ./build.zip -f`                 |
| `--dry-run`         | `extract`                 | boolean | Shows extraction plan only.              | `npm run unzip:extract -- ./build.zip --dry-run`          |
| `-v, --verbose`     | `extract`, `list`, `test` | boolean | Detailed logs.                           | `npm run unzip:extract -- ./build.zip -v`                 |
| `-q, --quiet`       | `extract`, `list`, `test` | boolean | Reduced output.                          | `npm run unzip:list -- ./build.zip -q`                    |
| `--flat`            | `extract`                 | boolean | Extracts files without folder structure. | `npm run unzip:extract -- ./build.zip --flat`             |
| `--match <pattern>` | `extract`, `list`, `test` | string  | Filters which entries are considered.    | `npm run unzip:extract -- ./build.zip --match "**/*.txt"` |

## Notes

- Use either positional `[out]` or `--out`, not both.
- `unzip:run` remains available as an alias for `unzip:extract`.
- Only `.zip` files are supported.
- If no output directory is provided, the default output directory is based on the zip file name.
