import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';

import tanstackQueryRules from './rules/query';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/tanstack',
    plugins: {
      '@tanstack/query': tanstackQueryPlugin,
    },
    rules: {
      ...tanstackQueryRules,
    },
  },
];

export default config;
