# @net-os/eslint-plugin

[![NPM Version](https://img.shields.io/npm/v/@net-os/eslint-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@net-os/eslint-plugin)
[![NPM Downloads](https://img.shields.io/npm/dm/@net-os/eslint-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@net-os/eslint-plugin)

> Opinionated ESLint flat config plugin for NetOS frontend projects.

Provides eight composable configs that enforce consistent code style across JavaScript, TypeScript, React, Expo, Tailwind CSS, TanStack Query, Vitest, and Vue codebases.

## Installation

```bash
npm install @net-os/eslint-plugin eslint --save-dev
```

You will also need to install the peer dependencies required by the configs you use. See the [peer dependencies](#peer-dependencies) section for the full list.

## Usage

This plugin requires **ESLint v9+** with [flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) (`eslint.config.ts`).

The default export is an async factory function. Pass an options object to enable the configs you need — only the selected configs (and their peer dependencies) are loaded.

### Basic TypeScript project

```ts
import netos from '@net-os/eslint-plugin';

export default netos({ typescript: true });
```

### Expo (React Native) project

```ts
import netos from '@net-os/eslint-plugin';

export default netos({ expo: true });
```

### Vue + Vitest project

```ts
import netos from '@net-os/eslint-plugin';

export default netos({ vue: true, vitest: true });
```

### Combining with custom config

Since `netos()` returns a promise, use `await` and spread the result into your own config array to add custom entries like global ignores or rule overrides:

```ts
import { defineConfig, globalIgnores } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

export default defineConfig([
  globalIgnores(['dist/', 'coverage/']),
  ...await netos({ react: true, vitest: true }),
  {
    rules: {
      'no-console': 'warn',
    },
  },
]);
```

## Configs

Enable configs by passing `true` in the options object. Only the selected configs and their plugins are loaded.

| Config        | Files                                                                  | Description                                                                                           |
|---------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `javascript`  | `**/*.{js,jsx,mjs,cjs}`                                                | Core ESLint rules, import ordering, stylistic rules, unicorn                                          |
| `typescript`  | `**/*.{ts,tsx,mts,cts}`                                                | Extends JavaScript rules with TypeScript-specific rules, naming conventions, and type-checked linting |
| `react`       | `**/*.tsx` (components), `**/*.{ts,tsx}` (hooks), test files (testing) | React, JSX a11y, hooks, DOM, testing-library                                                          |
| `expo`        | `**/*.{js,jsx,ts,tsx}`                                                 | Expo / React Native specific rules                                                                    |
| `vitest`      | test files (testing)                                                   | Vitest test rules (naming, structure, expectations, mocking)                                          |
| `vue`         | `**/*.{ts,vue}`                                                        | Vue component rules (template validation, props, directives, component structure)                     |
| `tailwindcss` | all files                                                              | Tailwind class ordering, duplicate detection, deprecation checks                                      |
| `tanstack`    | all files                                                              | TanStack Query exhaustive deps, property order, query function validation                             |

Configs that target all files (e.g. `tailwindcss`, `tanstack`) can be narrowed to specific file types by adding a `files` override after spreading:

```ts
import { defineConfig, globalIgnores } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

const configs = await netos({ react: true, tailwindcss: true });

export default defineConfig([
  globalIgnores(['dist/']),
  ...configs.map((config) => {
    return config.name?.startsWith('@net-os/tailwindcss')
      ? { ...config, files: ['**/*.{ts,tsx}'] }
      : config;
  }),
]);
```

### Config hierarchy and automatic dependency resolution

- **`typescript`** includes all `javascript` rules — you do not need to enable both.
- **`react`** and **`vue`** automatically include `typescript` (and thus `javascript`).
- **`expo`** automatically includes `react` and `typescript` (and thus `javascript`).
- You do not need to specify dependencies like `typescript: true` or `react: true` separately.
- **`tailwindcss`**, **`tanstack`**, and **`vitest`** are independent add-ons.

### React sub-configs

The `react` config is composed of three internal config entries:

| Name                    | Files           | Plugins                                                      |
|-------------------------|-----------------|--------------------------------------------------------------|
| `@net-os/react`         | `**/*.tsx`      | react, jsx-a11y, react-dom, react-x, react-naming-convention |
| `@net-os/react/hooks`   | `**/*.{ts,tsx}` | react-hooks, react-web-api                                   |
| `@net-os/react/testing` | test files      | testing-library                                              |

## Peer dependencies

Install only the peer dependencies required by the configs you use.

| Package                                 | Version | Configs                |
|-----------------------------------------|---------|------------------------|
| `eslint`                                | ^9.39.4 | all                    |
| `@stylistic/eslint-plugin`              | ^5.10.0 | javascript, typescript |
| `eslint-plugin-import`                  | ^2.32.0 | javascript, typescript |
| `eslint-plugin-unicorn`                 | ^63.0.0 | javascript, typescript |
| `@typescript-eslint/eslint-plugin`      | ^8.57.2 | typescript             |
| `@typescript-eslint/parser`             | ^8.57.2 | typescript             |
| `eslint-import-resolver-typescript`     | ^4.4.4  | typescript             |
| `typescript`                            | ^5.9.3  | typescript             |
| `eslint-plugin-react`                   | ^7.37.5 | react                  |
| `eslint-plugin-react-hooks`             | ^7.0.1  | react                  |
| `eslint-plugin-jsx-a11y`                | ^6.10.2 | react                  |
| `eslint-plugin-react-dom`               | ^2.13.0 | react                  |
| `eslint-plugin-react-naming-convention` | ^2.13.0 | react                  |
| `eslint-plugin-react-web-api`           | ^2.13.0 | react                  |
| `eslint-plugin-react-x`                 | ^2.13.0 | react                  |
| `eslint-plugin-testing-library`         | ^7.16.2 | react                  |
| `eslint-plugin-expo`                    | ^1.0.0  | expo                   |
| `eslint-plugin-better-tailwindcss`      | ^4.3.2  | tailwindcss            |
| `@tanstack/eslint-plugin-query`         | ^5.95.2 | tanstack               |
| `@vitest/eslint-plugin`                 | ^1.6.13 | vitest                 |
| `eslint-plugin-vue`                     | ~10.8.0 | vue                    |

## Development

This package is part of the [NetOS-coding-standards](https://github.com/MrGreenBoutiqueOffices/NetOS-coding-standards) monorepo.

```bash
npm run build        # Build with tsdown (ESM + CJS + .d.ts)
npm run watch        # Rebuild on file changes
npm run lint         # Lint src/ with ESLint
npm run lint:fix     # Auto-fix lint issues
npm run test         # Run tests with Vitest
npm run typecheck    # Type-check without emitting
```

## License

[MIT](LICENSE.md)
