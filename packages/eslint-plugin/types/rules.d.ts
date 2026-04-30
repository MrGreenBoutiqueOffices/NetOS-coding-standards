import type { MinimatchOptions } from 'minimatch';

export interface ImportExtensionOptions {
  pattern: Record<string, 'never' | 'always' | 'ignorePackages'>;
  pathGroupOverrides?: Array<{
    pattern: string;
    action: 'enforce' | 'ignore';
    patternOptions?: MinimatchOptions;
  }>;
  ignorePackages?: boolean;
  checkTypeImports?: boolean;
}
