import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import baseConfig from './vite.config'

export default defineConfig({
  ...baseConfig,
  build: {
    ...baseConfig.build,
    outDir: 'dist/umd',
    lib: {
      ...baseConfig.build!.lib,
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['umd'],
    },
    rollupOptions: {
      ...baseConfig.build!.rollupOptions,
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
