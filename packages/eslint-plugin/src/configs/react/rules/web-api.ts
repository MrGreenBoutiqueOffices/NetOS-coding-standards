import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'react-web-api/no-leaked-event-listener': 'error',
  'react-web-api/no-leaked-interval': 'error',
  'react-web-api/no-leaked-resize-observer': 'error',
  'react-web-api/no-leaked-timeout': 'error',
};

export default rules;
