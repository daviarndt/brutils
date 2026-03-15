# STR

## Overview

The `str` module provides local string transformations and encoding helpers for day-to-day terminal workflows.

## CLI Commands

```bash
brutils str slug --text "Olá Mundo Legal"
brutils str case --text "minha variavel legal" --to camel
brutils str trim --text "   hello world   "
brutils str truncate --text "hello world" --max 8 --suffix "..."
brutils str replace --text "hello 123" --from "\d+" --with "X" --regex
brutils str normalize --text "Café"
brutils str remove-accents --text "ação"
brutils str pad --text "42" --length 5 --side left
brutils str extract "\[(.*?)\]" --text "[one] [two]" --regex
brutils str base64 --text "hello" --mode encode
brutils str urlencode --text "hello world" --mode encode
brutils str html --text "<strong>ok</strong>" --mode encode
```

## Actions

| Action           | Usage                                                                        | Description                                  |
| ---------------- | ---------------------------------------------------------------------------- | -------------------------------------------- |
| `slug`           | `brutils str slug --text <value>`                                            | Convert text to a URL-friendly slug.         |
| `case`           | `brutils str case --text <value> --to <style>`                               | Convert text between casing styles.          |
| `trim`           | `brutils str trim --text <value>`                                            | Remove surrounding spaces and newlines.      |
| `truncate`       | `brutils str truncate --text <value> --max <n> [--suffix <value>]`           | Cut text to a maximum length.                |
| `replace`        | `brutils str replace --text <value> --from <value> --with <value> [--regex]` | Replace text fragments or regex matches.     |
| `normalize`      | `brutils str normalize --text <value>`                                       | Normalize text using Unicode NFC.            |
| `remove-accents` | `brutils str remove-accents --text <value>`                                  | Remove accents and diacritics.               |
| `pad`            | `brutils str pad --text <value> --length <n> [--side <side>]`                | Pad a string with spaces.                    |
| `extract`        | `brutils str extract <query> --text <value> [--regex]`                       | Extract content by regex or delimiter pairs. |
| `base64`         | `brutils str base64 --text <value> [--mode <mode>]`                          | Encode or decode Base64.                     |
| `urlencode`      | `brutils str urlencode --text <value> [--mode <mode>]`                       | Encode or decode URL content.                |
| `html`           | `brutils str html --text <value> [--mode <mode>]`                            | Encode or decode HTML entities.              |

## Flags

| Flag                         | Applies to                    | Type    | Description                                                             |
| ---------------------------- | ----------------------------- | ------- | ----------------------------------------------------------------------- |
| `--text <value>`             | most actions                  | string  | Inline input text.                                                      |
| `--file <path>`              | most actions                  | string  | Read input text from a file.                                            |
| `--to <style>`               | `case`                        | string  | Target style: `camel`, `snake`, `kebab`, `pascal`, `constant`, `title`. |
| `--max <n>`                  | `truncate`                    | integer | Maximum length.                                                         |
| `--suffix <value>`           | `truncate`                    | string  | Append a suffix such as `...` after truncation.                         |
| `--from <value>`             | `replace`                     | string  | Text or pattern to replace.                                             |
| `--with <value>`             | `replace`                     | string  | Replacement value.                                                      |
| `--regex`                    | `replace`, `extract`          | boolean | Interpret the replacement source or extraction query as regex.          |
| `--mode <encode\|decode>`    | `base64`, `urlencode`, `html` | string  | Select encoding or decoding mode.                                       |
| `--side <left\|right\|both>` | `pad`                         | string  | Pad direction.                                                          |
| `--length <n>`               | `pad`                         | integer | Target length.                                                          |

## Notes

- `extract` uses the positional `<query>` argument. With `--regex`, the query is a regex pattern; otherwise it must be a delimiter pair in the format `start|end`.
- `brutils str --help` shows examples and usage for the whole module.
