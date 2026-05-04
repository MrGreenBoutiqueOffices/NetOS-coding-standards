import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import reactNamingConventionPlugin from 'eslint-plugin-react-naming-convention';
import reactWebApiPlugin from 'eslint-plugin-react-web-api';
import reactDomPlugin from 'eslint-plugin-react-dom';
import reactCorePlugin from 'eslint-plugin-react-x';

import baseRules from './rules/base';
import hooksRules from './rules/hooks';
import jsxA11yRules from './rules/jsx-a11y';
import domRules from './rules/dom';
import namingRules from './rules/naming';
import testingRules from './rules/testing';
import webApiRules from './rules/web-api';
import xRules from './rules/x';

import { getImportExtensionsRuleOptions, getNamingConventionRuleOptions } from '../../utils/rules';
import { typescriptLanguageOptions, typescriptSettings } from '../../shared/typescript-language';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const tsxSettings: FlatConfig.Settings = {
  ...typescriptSettings,
  react: {
    version: 'detect',
  },
};

const overrideRules: FlatConfig.Rules = {
  'id-length': ['error', {
    exceptions: ['x', 'y'],
  }],
  'new-cap': ['error', {
    capIsNewExceptionPattern: String.raw`^(Immutable|Gesture)\.`,
  }],
  'import/no-unresolved': ['error', {
    ignore: [String.raw`\.(png|jpg|jpeg|gif|svg|webp|otf|ttf|woff2?)$`],
  }],
  'import/extensions': ['error', 'never', getImportExtensionsRuleOptions(true, true, true)],
  '@typescript-eslint/naming-convention': ['error', ...getNamingConventionRuleOptions([
    { selector: 'variable', format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'] },
    { selector: 'function', format: ['strictCamelCase', 'StrictPascalCase'] },
  ])],
  'unicorn/prevent-abbreviations': ['error', {
    checkShorthandProperties: true,
    checkProperties: true,
    ignore: [
      /^src$/i,
      // React specific ignores
      /attrs|env|params|prop|props|ref|refs/i,
    ],
  }],
};

const config: FlatConfig.ConfigArray = [
  {
    name: '@net-os/react',
    files: ['**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-naming-convention': reactNamingConventionPlugin,
      'react-dom': reactDomPlugin,
      'react-x': reactCorePlugin,
    },
    languageOptions: typescriptLanguageOptions,
    settings: tsxSettings,
    rules: {
      ...baseRules,
      ...jsxA11yRules,
      ...domRules,
      ...namingRules,
      ...xRules,
      ...overrideRules,
    },
  },
  {
    name: '@net-os/react/hooks',
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      'react-web-api': reactWebApiPlugin,
    },
    languageOptions: typescriptLanguageOptions,
    settings: tsxSettings,
    rules: {
      ...hooksRules,
      ...webApiRules,
      ...overrideRules,
    },
  },
  {
    name: '@net-os/react/testing',
    files: [
      '**/{tests,__tests__}/**/*.{ts,tsx}',
      '**/*{.,-}{spec,test}.{ts,tsx}',
      '**/*Test.{ts,tsx}',
    ],
    plugins: {
      'testing-library': testingLibraryPlugin,
    },
    languageOptions: typescriptLanguageOptions,
    settings: tsxSettings,
    rules: {
      ...testingRules,
      ...overrideRules,
    },
  },
];

export default config;
