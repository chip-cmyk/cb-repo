declare module './base.js' {
  export const config: Linter.Config; 
}
declare module '@repo/eslint-config/vue-internal' {
  import { Linter } from 'eslint';
  const config: Linter.Config;
  export default config;
}