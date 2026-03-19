import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
  'react-dom/no-dangerously-set-innerhtml': 'error',
  'react-dom/no-find-dom-node': 'error',
  'react-dom/no-flush-sync': 'error',
  'react-dom/no-hydrate': 'error',
  'react-dom/no-missing-button-type': 'error',
  'react-dom/no-missing-iframe-sandbox': 'error',
  'react-dom/no-namespace': 'error',
  'react-dom/no-render-return-value': 'error',
  'react-dom/no-render': 'error',
  'react-dom/no-script-url': 'error',
  'react-dom/no-string-style-prop': 'error',
  'react-dom/no-unknown-property': ['error', {
    requireDataLowercase: true,
  }],
  'react-dom/no-unsafe-iframe-sandbox': 'error',
  'react-dom/no-unsafe-target-blank': 'error',
  'react-dom/no-use-form-state': 'error',
  'react-dom/no-void-elements-with-children': 'error',
  'react-dom/prefer-namespace-import': 'error',
};

export default rules;
