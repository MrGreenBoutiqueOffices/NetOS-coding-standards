import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'configs/javascript': 'src/configs/javascript/index.ts',
    'configs/typescript': 'src/configs/typescript/index.ts',
    'configs/react': 'src/configs/react/index.ts',
    'configs/expo': 'src/configs/expo/index.ts',
    'configs/tailwindcss': 'src/configs/tailwindcss/index.ts',
    'configs/tanstack': 'src/configs/tanstack/index.ts',
    'configs/vitest': 'src/configs/vitest/index.ts',
    'configs/vue': 'src/configs/vue/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  fixedExtension: true,
  deps: {
    onlyBundle: false,
  },
});

