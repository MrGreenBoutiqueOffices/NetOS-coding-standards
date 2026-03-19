import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  '@tanstack/query/exhaustive-deps': 'error',
  '@tanstack/query/infinite-query-property-order': 'error',
  '@tanstack/query/mutation-property-order': 'error',
  '@tanstack/query/no-rest-destructuring': 'error',
  '@tanstack/query/no-unstable-deps': 'error',
  '@tanstack/query/no-void-query-fn': 'error',
  '@tanstack/query/stable-query-client': 'error',
};

export default rules;
