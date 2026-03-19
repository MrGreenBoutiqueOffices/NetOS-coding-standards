import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import stylisticPlugin from '@stylistic/eslint-plugin';
import unicornPlugin from 'eslint-plugin-unicorn';

import baseRules from './rules/base';
import importRules from './rules/import';
import stylisticRules, { stylisticJsxRules } from './rules/stylistic';
import unicornRules from './rules/unicorn';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/javascript',
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      import: importPlugin,
      '@stylistic': stylisticPlugin,
      unicorn: unicornPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...baseRules,
      ...importRules,
      ...stylisticRules,
      ...unicornRules,
    },
  },
  {
    name: '@net-os/javascript/jsx',
    files: ['**/*.{jsx}'],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...stylisticJsxRules,
    },
  },
];

export default config;
