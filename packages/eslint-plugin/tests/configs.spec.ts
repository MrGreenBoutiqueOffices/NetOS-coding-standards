import { describe, expect, it } from 'vitest';
import javascript from '../src/configs/javascript';
import typescript from '../src/configs/typescript';
import react from '../src/configs/react';
import expo from '../src/configs/expo';
import vue from '../src/configs/vue';
import vitest from '../src/configs/vitest';
import tailwindcss from '../src/configs/tailwindcss';
import tanstack from '../src/configs/tanstack';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

interface ConfigTestCase {
  name: string;
  config: FlatConfig.ConfigArray;
  expectedEntries: string[];
}

const configs: ConfigTestCase[] = [
  {
    name: 'javascript',
    config: javascript,
    expectedEntries: ['@net-os/javascript', '@net-os/javascript/jsx'],
  },
  {
    name: 'typescript',
    config: typescript,
    expectedEntries: ['@net-os/typescript', '@net-os/typescript/tsx'],
  },
  {
    name: 'react',
    config: react,
    expectedEntries: ['@net-os/react', '@net-os/react/hooks', '@net-os/react/testing'],
  },
  {
    name: 'expo',
    config: expo,
    expectedEntries: ['@net-os/expo'],
  },
  {
    name: 'vue',
    config: vue,
    expectedEntries: ['vue/base/setup', 'vue/base/setup-for-vue', '@net-os/vue/typescript', '@net-os/vue'],
  },
  {
    name: 'vitest',
    config: vitest,
    expectedEntries: ['@net-os/vitest'],
  },
  {
    name: 'tailwindcss',
    config: tailwindcss,
    expectedEntries: ['@net-os/tailwindcss'],
  },
  {
    name: 'tanstack',
    config: tanstack,
    expectedEntries: ['@net-os/tanstack'],
  },
];

describe.each(configs)('config smoke tests - $name', ({ config, expectedEntries }) => {
  it('should export a non-empty config array', () => {
    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThan(0);
  });

  it('should have named config entries', () => {
    const names = config.map(entry => entry.name);

    expect(names).toStrictEqual(expectedEntries);
  });

  it.each(
    config.filter(entry => entry.rules),
  )('should have rules in entry "$name"', entry => {
    expect(Object.keys(entry.rules ?? {}).length).toBeGreaterThan(0);
  });

  it.each(
    config.filter(entry => entry.plugins),
  )('should have plugins registered in entry "$name"', entry => {
    expect(Object.keys(entry.plugins ?? {}).length).toBeGreaterThan(0);
  });
});
