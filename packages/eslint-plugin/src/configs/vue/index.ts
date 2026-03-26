import vuePlugin from 'eslint-plugin-vue';

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
