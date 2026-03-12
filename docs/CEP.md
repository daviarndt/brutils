# CEP

## Overview

The CEP module provides generation, validation, formatting, stripping, and masking for CEP-like values used in development and testing workflows.

## Available Commands

### Generate CEP

```bash
npm run cep:generate
```

### Generate formatted CEP

```bash
npm run cep:generate -- --formatted
```

### Generate multiple formatted CEP values

```bash
npm run cep:generate -- --formatted --count 5
```

### Generate CEP with a state-biased leading range

```bash
npm run cep:generate -- --state PR
```

### Validate CEP

```bash
npm run cep:validate -- 86010190
```

### Validate CEP with stricter repeated-pattern checks

```bash
npm run cep:validate -- 86010190 --strict
```

### Format CEP

```bash
npm run cep:format -- 86010190
```

### Strip CEP punctuation

```bash
npm run cep:strip -- 86010-190
```

### Mask CEP with the default pattern

```bash
npm run cep:mask -- 86010190
```

### Mask CEP with a custom pattern

```bash
npm run cep:mask -- 86010190 --mask "###**-***"
```

## Actions

| Action     | Script                                         | Description                                  |
| ---------- | ---------------------------------------------- | -------------------------------------------- |
| `generate` | `npm run cep:generate -- [flags]`              | Generates synthetic CEP-like values.         |
| `validate` | `npm run cep:validate -- <cep> [--strict]`     | Validates CEP structure.                     |
| `format`   | `npm run cep:format -- <cep>`                  | Formats a CEP as `00000-000`.                |
| `strip`    | `npm run cep:strip -- <cep>`                   | Removes punctuation and returns digits only. |
| `mask`     | `npm run cep:mask -- <cep> [--mask <pattern>]` | Masks a CEP for safe display.                |

## Flags

| Flag               | Applies to     | Type    | Required | Description                                                                                                            | Example                                           |
| ------------------ | -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `--formatted`      | `cep:generate` | boolean | No       | Returns generated CEP values with punctuation.                                                                         | `npm run cep:generate -- --formatted`             |
| `--count <n>`      | `cep:generate` | integer | No       | Generates multiple CEP values in one run.                                                                              | `npm run cep:generate -- --count 10`              |
| `--strict`         | `cep:validate` | boolean | No       | Rejects obvious repeated patterns such as `11111111`.                                                                  | `npm run cep:validate -- 11111111 --strict`       |
| `--state <uf>`     | `cep:generate` | string  | No       | Biases the leading digit using a synthetic state-oriented range.                                                       | `npm run cep:generate -- --state PR`              |
| `--mask <pattern>` | `cep:mask`     | string  | No       | Defines a custom mask pattern. Use `*` to hide digits and `#` to reveal them. Numeric placeholders also reveal digits. | `npm run cep:mask -- 86010190 --mask "###**-***"` |

## Notes

- Validation accepts formatted or unformatted CEP values.
- CEP validation in the current version checks structure and length, with optional strict rejection of repeated patterns.
- Generated CEP values are synthetic fixtures and do not perform real address resolution.
