import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
  'better-tailwindcss/enforce-consistent-class-order': 'error',
  'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
  'better-tailwindcss/enforce-consistent-important-position': 'error',
  'better-tailwindcss/enforce-shorthand-classes': 'error',
  'better-tailwindcss/enforce-canonical-classes': 'error',
  'better-tailwindcss/no-duplicate-classes': 'error',
  'better-tailwindcss/no-deprecated-classes': 'error',
  'better-tailwindcss/no-unnecessary-whitespace': 'error',
  'better-tailwindcss/no-unknown-classes': 'error',
  'better-tailwindcss/no-conflicting-classes': 'error',
};

export default rules;
