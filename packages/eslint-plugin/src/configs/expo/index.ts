import pluginExpo from 'eslint-plugin-expo';

import baseRules from './rules/base';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const overrideRules: FlatConfig.Rules = {
  'jsx-a11y/prefer-tag-over-role': 'off',
};

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/expo',
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      expo: pluginExpo,
    },
    rules: {
      ...baseRules,
      ...overrideRules,
    },
  },
];

export default config;
