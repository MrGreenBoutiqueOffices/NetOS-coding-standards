import pluginExpo from 'eslint-plugin-expo';

import baseRules from './rules/base';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/expo',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      expo: pluginExpo,
    },
    rules: {
      ...baseRules,
    },
  },
];

export default config;
