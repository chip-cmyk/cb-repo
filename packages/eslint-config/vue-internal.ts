import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import type { FlatConfig } from '@typescript-eslint/utils/dist/ts-eslint/Config.js'
// @ts-ignore
import { config as baseConfig } from './base.js'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const config: FlatConfig.Config[] = defineConfigWithVueTs(
  ...baseConfig,
  { languageOptions: { globals: { ...globals.browser, ...globals.node }, ecmaVersion: 'latest' } },
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue,css}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/custom-rules',
    rules: {
      'no-undef': 'error',
      'vue/no-unused-components': 'error',
      'vue/block-lang': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_+$' }],
      '@typescript-eslint/no-require-imports': 'off',
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)

export default config
