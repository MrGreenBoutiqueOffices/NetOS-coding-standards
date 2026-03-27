import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import unicornPlugin from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';

import jsBaseRules from '../javascript/rules/base';
import jsImportRules from '../javascript/rules/import';
import jsStylisticRules from '../javascript/rules/stylistic';
import jsUnicornRules from '../javascript/rules/unicorn';

import tsBaseRules from '../typescript/rules/base';
import disabledJsRules from '../typescript/rules/disabled-js';
import tsExtensionRules from '../typescript/rules/extension';

import vueBaseRules from './rules/base';
import vueExtensionRules from './rules/extension';

import { typescriptLanguageOptions, typescriptSettings } from '../../shared/typescript-language';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const baseVueConfig = vuePlugin.configs['flat/base'];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { parser, ...languageOptions } = typescriptLanguageOptions;

const overrideRules: FlatConfig.Rules = {
  'unicorn/prevent-abbreviations': ['error', {
    checkShorthandProperties: true,
    checkProperties: true,
    ignore: [
      /^src$/i,
      // Vue specific ignores
      /attrs|params|prop|props|ref|refs/i,
    ],
  }],
};

const config: FlatConfig.ConfigArray = [
  ...baseVueConfig,
  {
    // Apply all TypeScript rules to .vue files as well
    name: '@net-os/vue/typescript',
    files: ['**/*.vue'],
    plugins: {
      import: importPlugin,
      unicorn: unicornPlugin,
      '@stylistic': stylisticPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...jsBaseRules,
      ...jsImportRules,
      ...jsStylisticRules,
      ...jsUnicornRules,
      ...disabledJsRules,
      ...tsBaseRules,
      ...tsExtensionRules,
      '@stylistic/indent': 'off',
    },
  },
  {
    name: '@net-os/vue',
    files: ['**/*.{ts,vue}'],
    plugins: {
      vue: vuePlugin,
    },
    languageOptions: {
      ...languageOptions,
      parserOptions: {
        ...languageOptions.parserOptions ?? {},
        parser: typescriptLanguageOptions.parser,
      },
    },
    settings: typescriptSettings,
    rules: {
      ...vueBaseRules,
      ...vueExtensionRules,
      ...overrideRules,
    },
  },
];

export default config;
