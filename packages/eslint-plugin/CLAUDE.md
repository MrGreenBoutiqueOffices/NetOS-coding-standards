# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@net-os/eslint-plugin` is an ESLint flat config plugin that bundles opinionated rule sets for NetOS frontend projects. It provides eight composable configs: `javascript`, `typescript`, `react`, `expo`, `tailwindcss`, `tanstack`, `vitest`, and `vue`. Consumers spread configs into their own ESLint flat config arrays.

This package lives inside a monorepo at `packages/eslint-plugin/`.

## Commands

```bash
npm run build        # Build with tsdown (ESM + CJS + .d.ts → dist/)
npm run watch        # Rebuild on file changes
npm run lint         # Lint src/ with ESLint
npm run lint:fix     # Auto-fix lint issues
npm run test         # Run tests with Vitest
npm run typecheck    # Type-check without emitting
```

## Architecture

### Entry point

`src/index.ts` exports a default plugin object with `meta` (name/version from package.json) and `configs` (all eight config arrays). It also exports `flatConfigs` as a named export for direct access.

### Config module pattern

Each config lives at `src/configs/{name}/` with:
- `index.ts` — exports a `FlatConfig.ConfigArray` that wires up plugins, parsers, settings, file globs, and rules
- `rules/*.ts` — each file exports a `FlatConfig.Rules` object (a plain record of rule-name to severity/options)

Rule files are pure data organized by concern (e.g., `react/rules/hooks.ts`, `react/rules/jsx-a11y.ts`). Config index files compose these rule objects into full ESLint config entries with the appropriate plugin/parser setup.

### Config hierarchy

- **javascript** — base rules for JS/JSX files (core ESLint, import, stylistic, unicorn). Two config entries: main rules + JSX-specific stylistic rules.
- **typescript** — re-applies all JS rules for TS files, disables conflicting JS rules (`disabled-js.ts`), adds TS-specific rules (`base.ts`), replaces JS rules with TS equivalents (`extension.ts`). Two config entries: main rules + TSX-specific stylistic rules. Uses shared TypeScript parser/language options from `src/shared/typescript-language.ts`.
- **react** — three config entries: `@net-os/react` (TSX component rules), `@net-os/react/hooks` (TS/TSX hooks + web API leak detection), `@net-os/react/testing` (testing-library rules for `**/{tests,__tests__}/**/*.{ts,tsx}`, `**/*{.,-}{spec,test}.{ts,tsx}`, `**/*Test.{ts,tsx}`). Overrides TypeScript naming conventions to allow React-specific patterns (props, ref, etc.).
- **expo** — Expo/React Native specific rules (env vars, box shadow, DOM exports)
- **tailwindcss** — Tailwind class ordering, duplicate/conflict detection via `eslint-plugin-better-tailwindcss`
- **tanstack** — TanStack Query rules (exhaustive deps, property order, query function validation)
- **vitest** — Vitest test rules (naming, structure, expectations, mocking) via `@vitest/eslint-plugin`. Targets `**/{tests,__tests__}/**/*.{js,jsx,ts,tsx}`, `**/*{.,-}{spec,test}.{js,jsx,ts,tsx}`, `**/*Test.{js,jsx,ts,tsx}`.
- **vue** — Vue component rules (template validation, directive ordering, component structure) for `**/*.{ts,vue}`. Integrates TypeScript parser via shared config. Overrides `unicorn/prevent-abbreviations` and `@typescript-eslint/no-use-before-define` for Vue-specific patterns.

### Shared utilities

- `src/shared/typescript-language.ts` — reusable TypeScript parser config, language options (projectService, ecmaVersion, globals), and import resolver settings. Used by typescript, react, and vue configs.
- `src/utils/rules.ts` — `getNamingConventionRuleOptions()` merges custom naming convention overrides with the defaults from `typescript/rules/base.ts`.

### Type declarations

`types/eslint-plugin-expo.d.ts` provides a module declaration for `eslint-plugin-expo` which lacks native types.

### Self-linting

The plugin lints itself using its own TypeScript config (`eslint.config.ts` extends `@net-os/typescript`).

### Build output

tsdown produces dual-format output in `dist/`: ESM (`.mjs`), CJS (`.cjs`), and declaration files (`.d.mts`, `.d.cts`). Source maps are enabled.

## Key Conventions

- All types come from `@typescript-eslint/utils/ts-eslint` (`FlatConfig.Rules`, `FlatConfig.ConfigArray`, `FlatConfig.Plugin`, etc.)
- Rule files are pure data — no plugin imports, just rule name/config mappings
- Plugin wiring (parser, plugin registration, file globs, settings) belongs in config `index.ts`, not in rule files
- Each config entry has a `name` field (e.g., `@net-os/typescript`, `@net-os/react/hooks`) for ESLint config inspector
- The `typescript` config re-imports and spreads JS rule files rather than extending the JS config array, so it stands alone
- React config overrides `@typescript-eslint/naming-convention` and `unicorn/prevent-abbreviations` to accommodate React patterns

## Adding a new config

1. Create `src/configs/{name}/index.ts` exporting a `FlatConfig.ConfigArray`
2. Create rule files in `src/configs/{name}/rules/` exporting `FlatConfig.Rules` objects
3. Import and register the config in `src/index.ts`
4. Add required plugins to `peerDependencies` in `package.json`

## Adding rules to an existing config

1. Add/modify rules in the appropriate `rules/*.ts` file
2. If a new plugin is needed, add it to the config's `index.ts` plugins object and to `peerDependencies`
