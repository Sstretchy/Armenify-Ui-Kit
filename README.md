# Armenify UI Kit

React UI kit scaffolded for shadcn/ui components, Tailwind CSS v4, and a future embeddable remote.

## Structure

- `src/styles/tokens.css` aggregates grouped token files.
- `src/styles/tokens/` contains color, text, spacing, and icon tokens with compatibility aliases.
- `src/styles/globals.css` imports the token groups and maps them into shadcn/ui and Tailwind v4 theme variables.
- `src/components/ui` contains shadcn-style primitives.
- `src/components/foundations` contains token and foundation previews for development.
- `src/embed.ts` exposes a host-friendly secondary entry for embedding.
- `src/mount.tsx` contains the mount API used by the package root and embed entry.
- `src/index.ts` is the package entry point for library consumers.

## Scripts

```bash
npm run dev
npm run storybook
npm run build-storybook
npm run typecheck
npm run build
```

Consumers can import the package CSS from `@armenify/ui-kit/styles.css` after build, or use `src/styles/globals.css` directly inside this workspace.

## Token Class Naming

Use the token name from `tokens.css` or a grouped token file directly inside the Tailwind utility name:

- `--primitive-colors-neutral-black` -> `bg-primitive-colors-neutral-black`
- `--semantic-bg-ntrl-primary` -> `bg-semantic-bg-ntrl-primary`
- `--semantic-text-brand-secondary` -> `text-semantic-text-brand-secondary`
- `--semantic-text-ntrl-primary-inverse` -> `text-semantic-text-ntrl-primary-inverse`
- `--semantic-text-brand-secondary-dark-inverse` -> `text-semantic-text-brand-secondary-dark-inverse`
- `--semantic-border-ntrl-default` -> `border-semantic-border-ntrl-default`
- `--components-controls-bg-secondary-default` -> `bg-components-controls-bg-secondary-default`
- `--components-controls-bg-secondary-pressed` -> `bg-components-controls-bg-secondary-pressed`
- `border/md` -> `rounded-border-md`
- `font/font-size/sm` -> `text-font-size-sm`
- `control shadow outer` -> `shadow-control-shadow-outer`

Spacing tokens stay in the token CSS, but are not exposed as Tailwind utilities. Use Tailwind spacing classes directly for layout.

Short shadcn aliases like `bg-background` and `text-primary` remain only as compatibility helpers for shadcn components.
