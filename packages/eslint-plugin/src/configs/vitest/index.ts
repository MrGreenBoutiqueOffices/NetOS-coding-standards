import vitestPlugin from '@vitest/eslint-plugin';

import vitestBaseRules from './rules/base';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/vitest',
    files: [
      '**/{tests,__tests__}/**/*.{js,jsx,ts,tsx}',
      '**/*{.,-}{spec,test}.{js,jsx,ts,tsx}',
      '**/*Test.{js,jsx,ts,tsx}',
    ],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestBaseRules,
    },
  },
];

export default config;
