import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'testing-library/await-async-events': 'error',
  'testing-library/await-async-queries': 'error',
  'testing-library/await-async-utils': 'error',
  'testing-library/consistent-data-testid': ['error', {
    testIdAttribute: ['data-testid', 'testId', 'testID'],
    testIdPattern: '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
  }],
  'testing-library/no-await-sync-events': 'error',
  'testing-library/no-await-sync-queries': 'error',
  'testing-library/no-container': 'error',
  'testing-library/no-debugging-utils': 'error',
  'testing-library/no-dom-import': 'error',
  'testing-library/no-global-regexp-flag-in-query': 'error',
  'testing-library/no-manual-cleanup': 'error',
  'testing-library/no-node-access': 'error',
  'testing-library/no-promise-in-fire-event': 'error',
  'testing-library/no-render-in-lifecycle': 'error',
  'testing-library/no-test-id-queries': 'off',
  'testing-library/no-unnecessary-act': 'error',
  'testing-library/no-wait-for-multiple-assertions': 'error',
  'testing-library/no-wait-for-side-effects': 'error',
  'testing-library/no-wait-for-snapshot': 'error',
  'testing-library/prefer-explicit-assert': 'error',
  'testing-library/prefer-find-by': 'error',
  'testing-library/prefer-implicit-assert': 'off',
  'testing-library/prefer-presence-queries': 'error',
  'testing-library/prefer-query-by-disappearance': 'error',
  'testing-library/prefer-query-matchers': 'off',
  'testing-library/prefer-screen-queries': 'error',
  'testing-library/prefer-user-event': 'error',
  'testing-library/render-result-naming-convention': 'error',
};

export default rules;
