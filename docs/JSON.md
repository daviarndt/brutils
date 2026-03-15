# JSON

## Overview

The `json` module provides local JSON formatting, validation, editing, diff and conversion helpers.

## CLI Commands

```bash
brutils json format --file ./config.json --sort-keys
brutils json minify --value '{"name":"brutils","ok":true}'
brutils json validate --value '{"ok":true}'
brutils json get --file ./config.json --path server.port
brutils json set --file ./config.json --path flags.dev --set-value true --in-place
brutils json delete --file ./config.json --path obsoleteFlag --in-place
brutils json diff --left ./left.json --right ./right.json
brutils json merge --file ./base.json ./override.json
brutils json to-yaml --value '{"name":"brutils","ok":true}'
```

## Actions

| Action     | Usage                                                                                                  | Description                                |
| ---------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `format`   | `brutils json format (--file <path> \| --value <json>) [--indent <n>] [--sort-keys] [--in-place]`      | Pretty-print JSON.                         |
| `minify`   | `brutils json minify (--file <path> \| --value <json>) [--in-place]`                                   | Minify JSON.                               |
| `validate` | `brutils json validate (--file <path> \| --value <json>)`                                              | Validate JSON syntax.                      |
| `get`      | `brutils json get (--file <path> \| --value <json>) --path <dot.path>`                                 | Read a path from JSON.                     |
| `set`      | `brutils json set (--file <path> \| --value <json>) --path <dot.path> --set-value <json> [--in-place]` | Write a path in JSON.                      |
| `delete`   | `brutils json delete (--file <path> \| --value <json>) --path <dot.path> [--in-place]`                 | Remove a path from JSON.                   |
| `diff`     | `brutils json diff --left <path-or-json> --right <path-or-json>`                                       | Diff two JSON files or inline JSON values. |
| `merge`    | `brutils json merge [--file <path>...] [--value <json>...]`                                            | Merge multiple JSON sources.               |
| `to-yaml`  | `brutils json to-yaml (--file <path> \| --value <json>)`                                               | Convert JSON to YAML.                      |

## Flags

| Flag                     | Applies to                          | Type    | Description                                   |
| ------------------------ | ----------------------------------- | ------- | --------------------------------------------- |
| `--file <path>`          | most actions                        | string  | Read JSON from a file.                        |
| `--value <json>`         | most actions                        | string  | Read JSON inline.                             |
| `--path <dot.path>`      | `get`, `set`, `delete`              | string  | JSON path to operate on.                      |
| `--set-value <json>`     | `set`                               | string  | New JSON value for the path.                  |
| `--indent <n>`           | `format`                            | integer | Pretty-print indentation size.                |
| `--sort-keys`            | `format`                            | boolean | Sort object keys recursively before printing. |
| `--left <path-or-json>`  | `diff`                              | string  | Left JSON file path or inline JSON value.     |
| `--right <path-or-json>` | `diff`                              | string  | Right JSON file path or inline JSON value.    |
| `--in-place`             | `set`, `delete`, `format`, `minify` | boolean | Write changes back to the input file.         |

## Notes

- `--in-place` requires `--file` because inline JSON cannot be overwritten.
- `merge` accepts multiple `--file` paths and/or multiple `--value` JSON strings in the same command.
- `brutils json --help` shows examples and usage for the whole module.
