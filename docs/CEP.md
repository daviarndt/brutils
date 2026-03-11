# CEP

## Overview

The CEP module provides generation and validation for CEP values.

## Available Commands

### Generate CEP

```bash
npm run cep:generate
```

### Generate formatted CEP

```bash
npm run cep:generate -- --formatted
```

### Validate CEP

```bash
npm run cep:validate -- 86010190
```

## Flags

### `--formatted`
Used with `cep:generate`.

When enabled, the generated CEP is returned with punctuation.

Example:
```bash
npm run cep:generate -- --formatted
```

Output example:
```text
86010-190
```

## Notes

- Validation accepts formatted or unformatted CEP values.
- CEP validation in the current version checks structure and length.
