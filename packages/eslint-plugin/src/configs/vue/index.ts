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

import { getNamingConventionRuleOptions } from '../../utils/rules';
import { typescriptLanguageOptions, typescriptSettings } from '../../shared/typescript-language';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const baseVueConfig = vuePlugin.configs['flat/base'];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { parser, ...baseLanguageOptions } = typescriptLanguageOptions;
const languageOptions: FlatConfig.LanguageOptions = {
  ...baseLanguageOptions,
  parserOptions: {
    ...baseLanguageOptions.parserOptions ?? {},
    parser: typescriptLanguageOptions.parser,
    extraFileExtensions: ['.vue'],
  },
};

const overrideRules: FlatConfig.Rules = {
  'id-length': ['error', {
    min: 2,
    properties: 'always',
    exceptions: ['t', 'rt', 'd', 'n', 'te', 'tm'],
  }],
  'unicorn/prevent-abbreviations': ['error', {
    checkShorthandProperties: true,
    checkProperties: true,
    ignore: [
      /^src$/i,
      // Vue specific ignores
      /attrs|params|prop|props|ref|refs/i,
    ],
  }],
  '@typescript-eslint/naming-convention': ['error', ...getNamingConventionRuleOptions([
    { selector: 'variable', format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'] },
  ])],
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
    languageOptions,
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
    languageOptions,
    settings: typescriptSettings,
    rules: {
      ...vueBaseRules,
      ...vueExtensionRules,
      ...overrideRules,
    },
  },
];

export default config;
