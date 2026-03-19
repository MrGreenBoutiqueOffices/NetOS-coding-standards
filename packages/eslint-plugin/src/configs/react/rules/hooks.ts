import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'react-hooks/exhaustive-deps': 'error',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/config': 'error',
  'react-hooks/error-boundaries': 'error',
  'react-hooks/component-hook-factories': 'error',
  'react-hooks/gating': 'off',
  'react-hooks/globals': 'error',
  'react-hooks/immutability': 'error',
  'react-hooks/preserve-manual-memoization': 'error',
  'react-hooks/purity': 'error',
  'react-hooks/refs': 'error',
  'react-hooks/set-state-in-effect': 'error',
  'react-hooks/set-state-in-render': 'error',
  'react-hooks/static-components': 'off',
  'react-hooks/unsupported-syntax': 'error',
  'react-hooks/use-memo': 'error',
  'react-hooks/incompatible-library': 'error',
};

export default rules;
