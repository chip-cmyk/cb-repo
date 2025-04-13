import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginChecker from 'vite-plugin-checker'
import vitePluginClean from 'vite-plugin-clean'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginChecker({ typescript: true }),
    vitePluginClean(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      // iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssMinify: 'lightningcss',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      cssFileName: 'style',
      name: 'carbonUI',
      fileName: (format) => `carbon-ui.${format}.js`,
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
        warn(warning)
      },
    },
  },
})
