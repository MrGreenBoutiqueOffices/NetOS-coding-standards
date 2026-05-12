import { describe, expect, it } from 'vitest';
import { getImportExtensionsRuleOptions } from '../../../src/utils/rules';

describe('getImportExtensionsRuleOptions utility', () => {
  it('should return base pattern with only json when called with no arguments', () => {
    const result = getImportExtensionsRuleOptions();

    expect(result).toStrictEqual({
      pattern: { json: 'always' },
    });
  });

  it('should not include optional properties when all flags are false', () => {
    const result = getImportExtensionsRuleOptions(false, false, false);

    expect(result).not.toHaveProperty('checkTypeImports');
    expect(result).not.toHaveProperty('pathGroupOverrides');
    expect(Object.keys(result.pattern)).toStrictEqual(['json']);
  });

  it('should include checkTypeImports when enabled', () => {
    const result = getImportExtensionsRuleOptions(true);

    expect(result).toStrictEqual({
      pattern: { json: 'always' },
      checkTypeImports: true,
    });
  });

  it('should include pathGroupOverrides for definition files when ignoreTypescriptDefinitionFileExtensions is enabled', () => {
    const result = getImportExtensionsRuleOptions(false, true);

    expect(result).toStrictEqual({
      pattern: { json: 'always' },
      pathGroupOverrides: [
        { pattern: '*.d.ts', patternOptions: { matchBase: true }, action: 'ignore' },
        { pattern: '*.d', patternOptions: { matchBase: true }, action: 'ignore' },
      ],
    });
  });

  it('should include media extension patterns when includeMediaExtensions is enabled', () => {
    const result = getImportExtensionsRuleOptions(false, false, true);

    expect(result).toStrictEqual({
      pattern: {
        json: 'always',
        png: 'always',
        jpg: 'always',
        jpeg: 'always',
        gif: 'always',
        svg: 'always',
        webp: 'always',
        otf: 'always',
        ttf: 'always',
        woff: 'always',
        woff2: 'always',
      },
    });
  });

  it('should combine all options when all flags are enabled', () => {
    const result = getImportExtensionsRuleOptions(true, true, true);

    expect(result).toStrictEqual({
      pattern: {
        json: 'always',
        png: 'always',
        jpg: 'always',
        jpeg: 'always',
        gif: 'always',
        svg: 'always',
        webp: 'always',
        otf: 'always',
        ttf: 'always',
        woff: 'always',
        woff2: 'always',
      },
      checkTypeImports: true,
      pathGroupOverrides: [
        { pattern: '*.d.ts', patternOptions: { matchBase: true }, action: 'ignore' },
        { pattern: '*.d', patternOptions: { matchBase: true }, action: 'ignore' },
      ],
    });
  });
});
