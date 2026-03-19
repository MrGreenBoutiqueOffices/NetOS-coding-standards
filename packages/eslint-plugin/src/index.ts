import packageJson from '../package.json';

import javascript from './configs/javascript';
import typescript from './configs/typescript';
import tailwindcss from './configs/tailwindcss';
import tanstack from './configs/tanstack';
import vitest from './configs/vitest';
import react from './configs/react';
import expo from './configs/expo';
import vue from './configs/vue';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const configs: Record<string, FlatConfig.ConfigArray> = {
  javascript,
  typescript,
  tailwindcss,
  tanstack,
  vitest,
  react,
  expo,
  vue,
};

const plugin: FlatConfig.Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  configs,
};

export const flatConfigs = configs;

export default plugin;
