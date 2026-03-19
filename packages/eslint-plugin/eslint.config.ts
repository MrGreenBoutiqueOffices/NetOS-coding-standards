import { defineConfig, globalIgnores } from 'eslint/config';
import pluginNetOS from './src';

export default defineConfig([
  globalIgnores(['dist/']),
  {
    plugins: {
      '@net-os': pluginNetOS,
    },
    extends: [
      '@net-os/typescript',
    ],
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },
]);
