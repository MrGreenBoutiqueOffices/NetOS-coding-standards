import { describe, expect, it } from 'vitest';
import { getNamingConventionRuleOptions } from '../../../src/utils/rules';
import { defaultNamingConventionOptions } from '../../../src/configs/typescript/rules/base';

describe('getNamingConventionRuleOptions utility', () => {
  it('should return a copy of defaults when called without overrides', () => {
    const result = getNamingConventionRuleOptions();

    expect(result).toStrictEqual(defaultNamingConventionOptions);
    expect(result).not.toBe(defaultNamingConventionOptions);
  });

  it('should return a copy of defaults when called with an empty array', () => {
    const result = getNamingConventionRuleOptions([]);

    expect(result).toStrictEqual(defaultNamingConventionOptions);
  });

  it('should insert item after matching selector by default', () => {
    const override = { selector: 'variable', format: ['UPPER_CASE'] };
    const result = getNamingConventionRuleOptions([override]);

    const originalIndex = defaultNamingConventionOptions.findIndex(rule => rule.selector === 'variable');

    expect(result).toHaveLength(defaultNamingConventionOptions.length + 1);
    expect(result[originalIndex]).toStrictEqual(defaultNamingConventionOptions[originalIndex]);
    expect(result[originalIndex + 1]).toStrictEqual(override);
  });

  it('should append item at end when selector does not match any default', () => {
    const override = { selector: 'nonExistent', format: ['strictCamelCase'] };
    const result = getNamingConventionRuleOptions([override]);

    expect(result).toHaveLength(defaultNamingConventionOptions.length + 1);
    expect(result.at(-1)).toStrictEqual(override);
  });

  it('should replace matching selector when overrideExistingSelector is true', () => {
    const override = { selector: 'variable', overrideExistingSelector: true, format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([override]);

    const originalIndex = defaultNamingConventionOptions.findIndex(rule => rule.selector === 'variable');

    expect(result).toHaveLength(defaultNamingConventionOptions.length);
    expect(result[originalIndex]).toStrictEqual({ selector: 'variable', format: ['StrictPascalCase'] });
  });

  it('should strip overrideExistingSelector from the output', () => {
    const override = { selector: 'variable', overrideExistingSelector: true, format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([override]);

    for (const item of result) {
      expect(item).not.toHaveProperty('overrideExistingSelector');
    }
  });

  it('should handle multiple overrides with mixed flags', () => {
    const overrides = [
      { selector: 'variable', overrideExistingSelector: true, format: ['StrictPascalCase'] },
      { selector: 'function', format: ['UPPER_CASE'] },
    ];
    const result = getNamingConventionRuleOptions(overrides);

    const originalVariableIndex = defaultNamingConventionOptions.findIndex(rule => rule.selector === 'variable');
    const originalFunctionIndex = defaultNamingConventionOptions.findIndex(rule => rule.selector === 'function');

    expect(result).toHaveLength(defaultNamingConventionOptions.length + 1);
    expect(result[originalVariableIndex]).toStrictEqual({ selector: 'variable', format: ['StrictPascalCase'] });
    expect(result[originalFunctionIndex]).toStrictEqual(defaultNamingConventionOptions[originalFunctionIndex]);
    expect(result[originalFunctionIndex + 1]).toStrictEqual({ selector: 'function', format: ['UPPER_CASE'] });
  });

  it('should keep non-matching selectors unchanged', () => {
    const override = { selector: 'variable', format: ['StrictPascalCase'] };
    const result = getNamingConventionRuleOptions([override]);

    const originalFunction = defaultNamingConventionOptions.find(rule => rule.selector === 'function');
    const resultFunction = result.find(rule => rule.selector === 'function');

    expect(resultFunction).toStrictEqual(originalFunction);
  });
});
