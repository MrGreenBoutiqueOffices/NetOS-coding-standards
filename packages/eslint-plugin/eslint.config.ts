import { globalIgnores } from 'eslint/config';
import netos from './src';

export default [
  globalIgnores(['dist/', '.claude/']),
  ...await netos({ typescript: true, vitest: true }),
];
