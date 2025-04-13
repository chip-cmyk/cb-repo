import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import baseConfig from './vite.config'

export default defineConfig({
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins!,
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types',
      rollupTypes: true,
      insertTypesEntry: true,
      exclude: ['node_modules/​**​'],
    }),
  ],
  build: {
    ...baseConfig.build,
    outDir: 'dist/es',
    lib: {
      ...baseConfig.build!.lib,

      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
    },
    rollupOptions: {
      ...baseConfig.build!.rollupOptions,
      external: [
        'vue',
        'async-validator',
        'lodash-es',
        '@popperjs/core',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
      ],
    },
  },
})
