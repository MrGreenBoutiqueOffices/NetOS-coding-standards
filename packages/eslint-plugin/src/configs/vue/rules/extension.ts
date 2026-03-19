import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const rules: FlatConfig.Rules = {
  'vue/array-bracket-newline': 'off',
  'vue/array-bracket-spacing': 'error',
  'vue/array-element-newline': 'off',
  'vue/arrow-spacing': 'error',
  'vue/block-spacing': 'error',
  'vue/brace-style': 'error',
  'vue/camelcase': ['error', {
    properties: 'never',
  }],
  'vue/comma-dangle': ['error', 'always-multiline'],
  'vue/comma-spacing': 'error',
  'vue/comma-style': 'error',
  'vue/dot-location': ['error', 'property'],
  'vue/dot-notation': 'error',
  'vue/eqeqeq': 'error',
  'vue/func-call-spacing': 'error',
  'vue/key-spacing': 'error',
  'vue/keyword-spacing': 'error',
  'vue/max-len': ['error', {
    code: 140,
    tabWidth: 2,
    ignoreUrls: true,
  }],
  'vue/multiline-ternary': 'off',
  'vue/no-console': ['error', {
    allow: ['warn', 'error'],
  }],
  'vue/no-constant-condition': 'error',
  'vue/no-empty-pattern': 'error',
  'vue/no-extra-parens': 'off',
  'vue/no-implicit-coercion': ['error', {
    boolean: true,
  }],
  'vue/no-irregular-whitespace': 'error',
  'vue/no-loss-of-precision': 'error',
  'vue/no-restricted-syntax': 'off',
  'vue/no-negated-condition': 'off',
  'vue/no-sparse-arrays': 'error',
  'vue/no-useless-concat': 'error',
  'vue/object-curly-newline': 'off',
  'vue/object-curly-spacing': ['error', 'always'],
  'vue/object-property-newline': ['error', {
    allowAllPropertiesOnSameLine: true,
  }],
  'vue/object-shorthand': ['error', 'always', {
    ignoreConstructors: false,
    avoidQuotes: true,
  }],
  'vue/operator-linebreak': ['error', 'before', {
    overrides: {
      '=': 'none',
    },
  }],
  'vue/prefer-template': 'error',
  'vue/quote-props': ['error', 'as-needed', {
    keywords: false,
    unnecessary: true,
    numbers: false,
  }],
  'vue/space-in-parens': 'error',
  'vue/space-infix-ops': 'error',
  'vue/space-unary-ops': 'error',
  'vue/template-curly-spacing': 'error',
};

export default rules;
