# Armenify token ownership

This directory is the source of truth for design-token groups used by the shared UI kit.

## File ownership

- `colors.css`: primitive, semantic, and component color tokens
- `texts.css`: typography scale and font-family tokens
- `spacing.css`: radius tokens only; layout spacing uses the Tailwind rem scale directly
- `icons.css`: icon stroke-width tokens
- `styles.css`: gradients, shadows, and motion/effect tokens

## Compatibility notes

- Prefer `--font-family-sans` and `--font-family-serif` as the canonical font-family tokens.
- `--font-primary`, `--font-secondary`, `--font-primary-font`, and `--font-secondary-font` are kept as compatibility aliases for existing consumers.
- Prefer Tailwind spacing utilities like `gap-2`, `px-5`, `size-10`, and `py-2.5` over bespoke spacing tokens.
- Prefer `--semantic-border-brand-default-inverse` as the canonical token name.
- `--semantic-border-brand-default-inversed` is kept as a compatibility alias until downstream consumers are migrated.
- Do not introduce CSS `px` units in shared UI styles or token files. Prefer an existing token first; otherwise express the value in `rem`.
