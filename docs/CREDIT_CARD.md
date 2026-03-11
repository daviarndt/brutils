# Credit Card

## Overview

The credit card module supports number generation, brand detection and validation.

## Supported Brands

- `visa`
- `mastercard`
- `amex`
- `elo`

## Available Commands

### Generate a credit card

```bash
npm run credit-card:generate -- --brand visa
```

### Generate a formatted credit card

```bash
npm run credit-card:generate -- --brand amex --formatted
```

### Detect card brand

```bash
npm run credit-card:detect -- 4111111111111111
```

### Validate a credit card payload

```bash
npm run credit-card:validate -- --number 4111111111111111 --expiry 12/30 --cvv 123
```

## Flags

### Generate command flags

#### `--brand`
Used with `credit-card:generate`.

Selects the card brand to generate.

Accepted values:
- `visa`
- `mastercard`
- `amex`
- `elo`

Examples:
```bash
npm run credit-card:generate -- --brand visa
npm run credit-card:generate -- --brand amex
```

#### `--formatted`
Used with `credit-card:generate`.

Formats the generated card number with spaces.

Example:
```bash
npm run credit-card:generate -- --brand visa --formatted
```

### Validate command flags

#### `--number`
Used with `credit-card:validate`.

The credit card number to validate.

#### `--expiry`
Used with `credit-card:validate`.

The expiry date in `MM/YY` format.

#### `--cvv`
Used with `credit-card:validate`.

The CVV code.

Example:
```bash
npm run credit-card:validate -- --number 4111111111111111 --expiry 12/30 --cvv 123
```

## Output example

```text
{
  brand: 'visa',
  number: '4111 1111 1111 1111',
  expiryMonth: '08',
  expiryYear: '28',
  expiry: '08/28',
  cvv: '123'
}
```

## Notes

- Validation uses the **Luhn algorithm** for card numbers.
- CVV length depends on the brand.
- Brand detection is supported for the currently configured brands.
