import { defaultNamingConventionOptions } from '@/configs/typescript/rules/base';

import type { ImportExtensionOptions } from '../../types/rules';
import type { NamingConventionItemLike } from '@/configs/typescript/rules/base';

export function getNamingConventionRuleOptions(
  // TODO: replace overrideExistingSelector boolean type with more advanced type like 'first' | 'last' | 'all'
  //  to determine what needs to be replaced. Because it's possible to have more than one of the same selectors.
  otherNamingConventionRules: Array<NamingConventionItemLike & { overrideExistingSelector?: boolean }> = [],
): NamingConventionItemLike[] {
  const namingConventionRules = [...defaultNamingConventionOptions];

  for (const { overrideExistingSelector = false, ...item } of otherNamingConventionRules) {
    const ruleIndex = namingConventionRules.findIndex(rule => rule.selector === item.selector);
    const spliceStart = ruleIndex === -1 ? namingConventionRules.length : ruleIndex + Number(!overrideExistingSelector);

    namingConventionRules.splice(spliceStart, Number(overrideExistingSelector), item);
  }

  return namingConventionRules;
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
