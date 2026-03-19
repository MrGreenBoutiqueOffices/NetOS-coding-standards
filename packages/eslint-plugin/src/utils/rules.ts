import { defaultNamingConventionOptions } from '../configs/typescript/rules/base';

import type { NamingConventionItemLike } from '../configs/typescript/rules/base';

export function getNamingConventionRuleOptions(replacements?: NamingConventionItemLike[]): NamingConventionItemLike[] {
  if (replacements) {
    return defaultNamingConventionOptions.map(option => {
      return replacements.find(replacement => replacement.selector === option.selector) ?? option;
    });
  }

  return [...defaultNamingConventionOptions];
}
