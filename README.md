# Brutils

**Brutils** is a production-ready command-line toolkit for Brazilian and general developer workflows.

It includes:

- CPF, CNPJ and CEP generation, validation, formatting, stripping and masking
- credit card test data generation, validation and brand detection
- string helpers for transformation, extraction and encoding
- local JSON helpers for formatting, editing, diffing and YAML conversion
- digest helpers, UUID/token/password generation and quick date utilities
- random integers, floats, picks, shuffles, dice rolls and coin flips
- number picking with deterministic seeds
- ZIP creation, archive listing, archive testing and ZIP extraction

Brutils **1.0.0** ships with a single public interface:

```bash
brutils --help
```

There are no legacy command entrypoints in this release. The official way to use the project is through the `brutils` CLI.

---

## Installation

### Local development

```bash
npm install
npm run build
npm link
```

After linking, the `brutils` command will be available on your machine for local development.

### From GitHub Packages

If the package is published to GitHub Packages and your registry is configured, install it globally and use the CLI directly:

```bash
npm install -g @danielarndt0/brutils-cli
brutils --help
```

---

## Quick Start

```bash
brutils cpf generate --formatted
brutils cnpj validate 11.444.777/0001-61 --strict
brutils cep mask 86010190 --mask "###**-***"

brutils credit-card generate --brand visa --formatted
brutils credit-card detect 4111111111111111

brutils str slug --text "Hello Cool World"
brutils json format --value '{"name":"brutils","ok":true}' --sort-keys
brutils hash sha256 --text hello
brutils id token --length 24 --charset base64url
brutils date diff --from 2024-01-01T00:00:00Z --to 2024-01-03T00:00:00Z --unit days

brutils random-number int --min 1 --max 60 --count 6 --unique --sorted
brutils random-number pick --items "red,blue,green" --count 2
brutils number-picker run --min 1 --max 100 --seed 42

brutils zip create ./dist --out ./artifacts/dist.zip
brutils unzip extract ./artifacts/dist.zip --out ./restored
```

Supported command aliases:

- `brutils card ...` for `brutils credit-card ...`
- `brutils rand ...` for `brutils random-number ...`
- `brutils zip run ...` for `brutils zip create ...`
- `brutils unzip run ...` for `brutils unzip extract ...`

---

## Built-in Help

The CLI includes root, module and action help.

```bash
brutils --help
brutils cpf --help
brutils cpf generate --help
brutils str --help
brutils json format --help
brutils hash --help
brutils date diff --help
brutils zip create --help
```

---

## Development

Brutils now exposes a single command surface to end users: `brutils`.

The `package.json` scripts are reserved for project development tasks:

```bash
npm run build
npm run lint
npm run typecheck
npm run test:unit
npm run cli -- --help
```

Examples while developing locally:

```bash
npm run cli -- cpf generate --formatted
npm run cli -- json format --file ./package.json --sort-keys
npm run cli -- zip create ./dist --out ./artifacts/dist.zip
```

---

## Documentation

- [CPF](docs/CPF.md)
- [CNPJ](docs/CNPJ.md)
- [CEP](docs/CEP.md)
- [Credit Card](docs/CREDIT_CARD.md)
- [STR](docs/STR.md)
- [JSON](docs/JSON.md)
- [Hash](docs/HASH.md)
- [ID](docs/ID.md)
- [Date](docs/DATE.md)
- [Random Number](docs/RANDOM_NUMBER.md)
- [Number Picker](docs/NUMBER_PICKER.md)
- [ZIP](docs/ZIP.md)
- [UNZIP](docs/UNZIP.md)

---

## Release Notes for 1.0.0

- `brutils` is now the single public interface for the toolkit
- legacy script entrypoints have been removed from the package surface
- documentation was consolidated around the CLI-first workflow
- the project version was promoted to `1.0.0`
