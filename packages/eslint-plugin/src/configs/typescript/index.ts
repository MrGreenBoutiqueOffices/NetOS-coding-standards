import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import unicornPlugin from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';

import jsBaseRules from '../javascript/rules/base';
import jsImportRules from '../javascript/rules/import';
import jsStylisticRules, { stylisticJsxRules } from '../javascript/rules/stylistic';
import jsUnicornRules from '../javascript/rules/unicorn';

import tsBaseRules from './rules/base';
import disabledJsRules from './rules/disabled-js';
import extensionRules from './rules/extension';

import { typescriptLanguageOptions, typescriptSettings } from '../../shared/typescript-language';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/typescript',
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
      import: importPlugin,
      unicorn: unicornPlugin,
      '@stylistic': stylisticPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: typescriptLanguageOptions,
    settings: typescriptSettings,
    rules: {
      ...jsBaseRules,
      ...jsImportRules,
      ...jsStylisticRules,
      ...jsUnicornRules,
      ...disabledJsRules,
      ...tsBaseRules,
      ...extensionRules,
    },
  },
  {
    name: '@net-os/typescript/tsx',
    files: ['**/*.tsx'],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    languageOptions: typescriptLanguageOptions,
    settings: typescriptSettings,
    rules: {
      ...stylisticJsxRules,
    },
  },
];

export default config;
