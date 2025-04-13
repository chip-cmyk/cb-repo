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
  {
    name: 'app/files-to-lint',
    files: ['​**​/*.{ts,mts,tsx,vue,css}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['​**​/dist/​**​', '​**​/dist-ssr/​**​', '​**​/coverage/​**​', '​**​/node_modules/​**​'],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/custom-rules',
    rules: {
      // ...你的规则
    },
  }
)

export default config