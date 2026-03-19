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

This plugin requires **ESLint v9+** with [flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) (`eslint.config.js` / `eslint.config.ts`).

### Basic TypeScript project

```js
import { defineConfig } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

export default defineConfig([
  ...netos.configs.typescript,
]);
```

### React + Tailwind CSS project

```js
import { defineConfig } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

export default defineConfig([
  ...netos.configs.typescript,
  ...netos.configs.react,
  ...netos.configs.tailwindcss,
]);
```

### Expo (React Native) project

```js
import { defineConfig } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

export default defineConfig([
  ...netos.configs.typescript,
  ...netos.configs.react,
  ...netos.configs.expo,
]);
```

### Vue + Vitest project

```js
import { defineConfig } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

export default defineConfig([
  ...netos.configs.typescript,
  ...netos.configs.vue,
  ...netos.configs.vitest,
]);
```

### Using the named export

```js
import { defineConfig } from 'eslint/config';
import { flatConfigs } from '@net-os/eslint-plugin';

export default defineConfig([
  ...flatConfigs.typescript,
  ...flatConfigs.react,
]);
```

## Configs

Each config is an array of flat config objects that you spread into your config.

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

Configs that target all files by default (e.g. `tailwindcss`, `tanstack`) can be narrowed to specific file types by adding a `files` override after spreading:

```js
import { defineConfig } from 'eslint/config';
import netos from '@net-os/eslint-plugin';

export default defineConfig([
  ...netos.configs.tailwindcss.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
]);
```

### Config hierarchy

- **`typescript`** includes all `javascript` rules — you do not need to use both.
- **`react`** and **`vue`** are additive — use them alongside `typescript`.
- **`expo`**, **`tailwindcss`**, **`tanstack`**, and **`vitest`** are independent add-ons.

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
