import { getImportExtensionsRuleOptions } from '../../../utils/rules';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'import/export': 'error',
  'import/no-deprecated': 'off',
  'import/no-empty-named-blocks': 'error',
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: [
      '**/tests/**',
      '**/__tests__/**',
    ],
  }],
  'import/no-mutable-exports': 'error',
  'import/no-named-as-default': 'off',
  'import/no-named-as-default-member': 'error',
  'import/no-unused-modules': 'off',
  'import/no-amd': 'error',
  'import/no-commonjs': 'off',
  'import/no-import-module-exports': 'error',
  'import/no-nodejs-modules': 'off',
  'import/unambiguous': 'off',
  'import/default': 'error',
  'import/named': 'error',
  'import/namespace': 'off',
  'import/no-absolute-path': 'error',
  'import/no-cycle': 'off',
  'import/no-dynamic-require': 'off',
  'import/no-internal-modules': 'off',
  'import/no-relative-packages': 'error',
  'import/no-relative-parent-imports': 'off',
  'import/no-restricted-paths': 'off',
  'import/no-self-import': 'error',
  'import/no-unresolved': 'error',
  'import/no-useless-path-segments': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/consistent-type-specifier-style': 'error',
  'import/dynamic-import-chunkname': 'off',
  'import/exports-last': 'off',
  'import/extensions': ['error', 'never', getImportExtensionsRuleOptions()],
  'import/first': 'error',
  'import/group-exports': 'off',
  'import/newline-after-import': 'error',
  'import/no-anonymous-default-export': 'error',
  'import/no-default-export': 'off',
  'import/no-duplicates': 'error',
  'import/no-named-default': 'error',
  'import/no-named-export': 'off',
  'import/no-namespace': 'off',
  'import/no-unassigned-import': 'off',
  'import/order': ['error', {
    groups: [
      ['builtin', 'external'],
      ['internal', 'parent', 'sibling', 'index', 'object'],
      ['type'],
    ],
    pathGroups: [
      {
        pattern: '@tests/**',
        group: 'internal',
      },
      {
        pattern: '?(@)[a-z]*',
        position: 'before',
        group: 'type',
      },
      {
        pattern: '?(@)[a-z]*/**',
        position: 'before',
        group: 'type',
      },
    ],
    pathGroupsExcludedImportTypes: ['builtin', 'external'],
    warnOnUnassignedImports: false,
    distinctGroup: true,
    named: false,
  }],
  'import/prefer-default-export': 'off',
};

export default rules;
