import betterTailwindPlugin from 'eslint-plugin-better-tailwindcss';

import baseRules from './rules/base';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/tailwindcss',
    plugins: {
      'better-tailwindcss': betterTailwindPlugin,
    },
    rules: {
      ...baseRules,
    },
  },
];

export default config;
