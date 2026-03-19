import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'expo/no-dynamic-env-var': 'error',
  'expo/no-env-var-destructuring': 'error',
  'expo/prefer-box-shadow': 'error',
  'expo/use-dom-exports': 'error',
};

export default rules;
