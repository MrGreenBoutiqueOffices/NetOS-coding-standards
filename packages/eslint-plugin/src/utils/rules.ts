import { defaultNamingConventionOptions } from '../configs/typescript/rules/base';

import type { ImportExtensionOptions } from '../../types/rules';
import type { NamingConventionItemLike } from '../configs/typescript/rules/base';

export function getNamingConventionRuleOptions(replacements?: NamingConventionItemLike[]): NamingConventionItemLike[] {
  if (replacements) {
    return defaultNamingConventionOptions.map(option => {
      return replacements.find(replacement => replacement.selector === option.selector) ?? option;
    });
  }

  return [...defaultNamingConventionOptions];
}

export function getImportExtensionsRuleOptions(
  checkTypeImports = false,
  ignoreTypescriptDefinitionFileExtensions = false,
  includeMediaExtensions = false,
): ImportExtensionOptions {
  const options: ImportExtensionOptions = {
    pattern: {
      json: 'always',
    },
  };

  if (checkTypeImports) {
    options.checkTypeImports = true;
  }

  if (ignoreTypescriptDefinitionFileExtensions) {
    options.pathGroupOverrides = [
      { pattern: '*.d.ts', patternOptions: { matchBase: true }, action: 'ignore' },
      { pattern: '*.d', patternOptions: { matchBase: true }, action: 'ignore' },
    ];
  }

  if (includeMediaExtensions) {
    ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'otf', 'ttf', 'woff', 'woff2'].forEach(mediaExtension => {
      options.pattern[mediaExtension] = 'always';
    });
  }

  return options;
}
