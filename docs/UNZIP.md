# UNZIP

## Overview

The UNZIP module extracts `.zip` files into a destination directory.

## Available Command

```bash
npm run unzip:run -- <source> [out] [options]
```

## Positional Arguments

| Argument   | Required | Description             | Example                                     |
| ---------- | -------- | ----------------------- | ------------------------------------------- |
| `<source>` | Yes      | `.zip` file to extract. | `npm run unzip:run -- ./build.zip`          |
| `[out]`    | No       | Destination directory.  | `npm run unzip:run -- ./build.zip ./output` |

## Flags

| Flag              | Type    | Required | Description                                                | Example                                           |
| ----------------- | ------- | -------- | ---------------------------------------------------------- | ------------------------------------------------- |
| `-o, --out <dir>` | string  | No       | Sets the exact destination directory.                      | `npm run unzip:run -- ./build.zip --out ./output` |
| `-f, --force`     | boolean | No       | Overwrites the destination directory if it already exists. | `npm run unzip:run -- ./build.zip -f`             |
| `--dry-run`       | boolean | No       | Shows the extraction plan without extracting files.        | `npm run unzip:run -- ./build.zip --dry-run`      |
| `-v, --verbose`   | boolean | No       | Shows detailed logs.                                       | `npm run unzip:run -- ./build.zip -v`             |
| `-q, --quiet`     | boolean | No       | Reduces terminal output.                                   | `npm run unzip:run -- ./build.zip -q`             |

## Notes

- Use either positional `[out]` or `--out`, not both.
- Only `.zip` files are supported.
- If the output directory already exists, the command fails unless `--force` is used.
- If no output directory is provided, the default output directory is based on the zip file name.
