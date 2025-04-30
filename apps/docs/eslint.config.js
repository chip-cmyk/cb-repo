import { default as baseConfig } from '@repo/eslint-config/vue-internal'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{ts,mts,tsx,vue,css,js}'],
    extends: [baseConfig],
  },
  {
    rules: {
      'vue/block-lang': 'off', // 避免script和style的lang属性报错
    },
  },
])
