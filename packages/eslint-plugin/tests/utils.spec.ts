// eslint-disable-next-line unicorn/prevent-abbreviations
import { describe, expect, it } from 'vitest';

import { getNamingConventionRuleOptions } from '../src/utils/rules';
import { defaultNamingConventionOptions } from '../src/configs/typescript/rules/base';

import type { NamingConventionItemLike } from '../src/configs/typescript/rules/base';

function findBySelector(
  options: NamingConventionItemLike[],
  selectorName: string,
): NamingConventionItemLike | undefined {
  return options.find(option => option.selector === selectorName);
}

describe('getNamingConventionRuleOptions', () => {
  it('should return a copy of defaults when called without replacements', () => {
    const result = getNamingConventionRuleOptions();

    expect(result).toStrictEqual(defaultNamingConventionOptions);
    expect(result).not.toBe(defaultNamingConventionOptions);
  });

  it('should return a copy of defaults when called with undefined', () => {
    const result = getNamingConventionRuleOptions();

    expect(result).toStrictEqual(defaultNamingConventionOptions);
  });

  it('should replace a matching selector', () => {
    const replacement = { selector: 'variable', format: ['StrictPascalCase', 'UPPER_CASE'] };
    const result = getNamingConventionRuleOptions([replacement]);

    expect(findBySelector(result, 'variable')).toStrictEqual(replacement);
  });

  it('should keep non-matching selectors unchanged', () => {
    const replacement = { selector: 'variable', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([replacement]);

    const originalFunctionOption = defaultNamingConventionOptions.find(
      option => option.selector === 'function',
    );

    expect(findBySelector(result, 'function')).toStrictEqual(originalFunctionOption);
  });

  it('should handle multiple replacements', () => {
    const replacements = [
      { selector: 'variable', format: ['StrictPascalCase', 'UPPER_CASE'] },
      { selector: 'function', format: ['StrictPascalCase'] },
    ];
    const result = getNamingConventionRuleOptions(replacements);

    expect(findBySelector(result, 'variable')).toStrictEqual(replacements[0]);
    expect(findBySelector(result, 'function')).toStrictEqual(replacements[1]);
  });

  it('should preserve the same number of options', () => {
    const replacement = { selector: 'variable', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([replacement]);

    expect(result).toHaveLength(defaultNamingConventionOptions.length);
  });

  it('should not replace anything when replacement selector does not match', () => {
    const replacement = { selector: 'nonExistentSelector', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([replacement]);

    expect(result).toStrictEqual(defaultNamingConventionOptions);
  });
});
