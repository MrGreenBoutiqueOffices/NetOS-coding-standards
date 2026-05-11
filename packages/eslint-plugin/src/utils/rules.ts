import { defaultNamingConventionOptions } from '../configs/typescript/rules/base';

import type { ImportExtensionOptions } from '../../types/rules';
import type { NamingConventionItemLike } from '../configs/typescript/rules/base';

export function getNamingConventionRuleOptions(
  overrides: NamingConventionItemLike[] = [],
): NamingConventionItemLike[] {
  const bySlot = new Map<string, NamingConventionItemLike>();
  const slotKey = (item: NamingConventionItemLike): string => {
    const { selector, modifiers = [], filter = null } = item;

    return JSON.stringify([selector, [...modifiers].sort(), filter]);
  };

  for (const item of [...defaultNamingConventionOptions, ...overrides]) {
    bySlot.set(slotKey(item), item);
  }

  return [...bySlot.values()];
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
