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

| Flag          | Command                | Type    | Required | Description                                    | Accepted values / Example                                  |
| ------------- | ---------------------- | ------- | -------- | ---------------------------------------------- | ---------------------------------------------------------- |
| `--brand`     | `credit-card:generate` | string  | No       | Selects the card brand to generate.            | `visa`, `mastercard`, `amex`, `elo`                        |
| `--formatted` | `credit-card:generate` | boolean | No       | Formats the generated card number with spaces. | `npm run credit-card:generate -- --brand visa --formatted` |

### Validate command flags

| Flag       | Command                | Type   | Required | Description                         | Example                     |
| ---------- | ---------------------- | ------ | -------- | ----------------------------------- | --------------------------- |
| `--number` | `credit-card:validate` | string | Yes      | The credit card number to validate. | `--number 4111111111111111` |
| `--expiry` | `credit-card:validate` | string | Yes      | The expiry date in `MM/YY` format.  | `--expiry 12/30`            |
| `--cvv`    | `credit-card:validate` | string | Yes      | The CVV code.                       | `--cvv 123`                 |

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
