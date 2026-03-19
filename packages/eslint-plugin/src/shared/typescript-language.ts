import globals from 'globals';
import * as typescriptParserBase from '@typescript-eslint/parser';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

export const typescriptParser: FlatConfig.Parser = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  parseForESLint: typescriptParserBase.parseForESLint,
  meta: typescriptParserBase.meta,
};

export const typescriptLanguageOptions: FlatConfig.LanguageOptions = {
  parser: typescriptParser,
  parserOptions: {
    projectService: true,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: {
    ...globals.browser,
    ...globals.node,
  },
};

export const typescriptSettings: FlatConfig.Settings = {
  'import/resolver': {
    typescript: true,
  },
};
