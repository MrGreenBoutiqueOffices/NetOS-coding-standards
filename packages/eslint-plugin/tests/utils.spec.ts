// eslint-disable-next-line unicorn/prevent-abbreviations
import { describe, expect, it } from 'vitest';
import { getNamingConventionRuleOptions } from '../src/utils/rules';
import { defaultNamingConventionOptions } from '../src/configs/typescript/rules/base';

import type { NamingConventionItemLike } from '../src/configs/typescript/rules/base';

function findBySlot(
  options: NamingConventionItemLike[],
  selector: string,
  modifiers?: string[],
  filter?: unknown,
): NamingConventionItemLike | undefined {
  return options.find(option => {
    return option.selector === selector
      && JSON.stringify([...(option.modifiers ?? [])].sort()) === JSON.stringify([...(modifiers ?? [])].sort())
      && JSON.stringify(option.filter ?? null) === JSON.stringify(filter ?? null);
  });
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

  it('should replace a matching slot', () => {
    const replacement = { selector: 'variable', format: ['StrictPascalCase', 'UPPER_CASE'] };
    const result = getNamingConventionRuleOptions([replacement]);

    expect(findBySlot(result, 'variable')).toStrictEqual(replacement);
  });

  it('should keep non-matching slots unchanged', () => {
    const replacement = { selector: 'variable', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([replacement]);

    const originalFunctionOption = findBySlot(defaultNamingConventionOptions, 'function');

    expect(findBySlot(result, 'function')).toStrictEqual(originalFunctionOption);
  });

  it('should handle multiple replacements', () => {
    const replacements = [
      { selector: 'variable', format: ['StrictPascalCase', 'UPPER_CASE'] },
      { selector: 'function', format: ['StrictPascalCase'] },
    ];
    const result = getNamingConventionRuleOptions(replacements);

    expect(findBySlot(result, 'variable')).toStrictEqual(replacements[0]);
    expect(findBySlot(result, 'function')).toStrictEqual(replacements[1]);
  });

  it('should preserve the same number of options when replacing an existing slot', () => {
    const replacement = { selector: 'variable', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([replacement]);

    expect(result).toHaveLength(defaultNamingConventionOptions.length);
  });

  it('should append override when selector does not match any default', () => {
    const override = { selector: 'nonExistentSelector', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([override]);

    expect(result).toHaveLength(defaultNamingConventionOptions.length + 1);
    expect(findBySlot(result, 'nonExistentSelector')).toStrictEqual(override);
  });

  it('should replace when selector and modifiers both match', () => {
    const replacement = { selector: 'objectLiteralProperty', modifiers: ['requiresQuotes'], format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([replacement]);

    expect(findBySlot(result, 'objectLiteralProperty', ['requiresQuotes'])).toStrictEqual(replacement);
    expect(result).toHaveLength(defaultNamingConventionOptions.length);
  });

  it('should append when selector matches but modifiers differ', () => {
    const override = { selector: 'objectLiteralProperty', format: ['UPPER_CASE'] };
    const result = getNamingConventionRuleOptions([override]);

    expect(result).toHaveLength(defaultNamingConventionOptions.length + 1);
    expect(findBySlot(result, 'objectLiteralProperty')).toStrictEqual(override);
    expect(findBySlot(result, 'objectLiteralProperty', ['requiresQuotes'])).toStrictEqual(
      findBySlot(defaultNamingConventionOptions, 'objectLiteralProperty', ['requiresQuotes']),
    );
  });

  it('should append when selector matches but filter differs', () => {
    const override = { selector: 'variable', filter: { regex: '^_', match: false }, format: ['strictCamelCase'] };
    const result = getNamingConventionRuleOptions([override]);

    expect(result).toHaveLength(defaultNamingConventionOptions.length + 1);
    expect(findBySlot(result, 'variable', [], { regex: '^_', match: false })).toStrictEqual(override);
    expect(findBySlot(result, 'variable')).toStrictEqual(
      findBySlot(defaultNamingConventionOptions, 'variable'),
    );
  });

  it('should match slot regardless of modifiers order', () => {
    const first = { selector: 'testSelector', modifiers: ['async', 'exported'], format: ['strictCamelCase'] };
    const second = { selector: 'testSelector', modifiers: ['exported', 'async'], format: ['UPPER_CASE'] };
    const result = getNamingConventionRuleOptions([first, second]);

    const matchingItems = result.filter(option => option.selector === 'testSelector');

    expect(matchingItems).toHaveLength(1);
    expect(matchingItems[0]).toStrictEqual(second);
  });
});
