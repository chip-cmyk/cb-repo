import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import autoSidebar from '@ptpchips/vitepress-plugin-auto-sidebar'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// console.log(new URL('../../../packages/carbon-ui/src', import.meta.url), 'new URL')
// console.log(import.meta.url, 'import.meta.url')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Carbon UI',
  description: 'A UI library based Vue 3',
  vite: {
    ssr: { noExternal: ['@ptpchips/carbon-ui'] },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../../packages/carbon-ui/src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['@ptpchips/carbon-ui'],
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      autoSidebar({
        // rootDir: 'docs', // 可选覆盖默认srcDir
        // basePath: '/', // 可选覆盖默认base
        groups: [
          {
            title: 'Guides',
            dir: 'guides',
            // collapsed: true,
          },
          {
            title: 'Components',
            dir: 'components',
            ignoreFiles: ['internal.md'],
          },
        ],
      }) as any,
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        // iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        iconDirs: [fileURLToPath(new URL('../assets/icons', import.meta.url))],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
        svgoOptions: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: ['fill', 'stroke'],
              },
            },
            'removeDimensions',
            { name: 'convertColors', params: { currentColor: true } },
          ],
        },
      }),
    ],
    build: {
      target: 'esnext',
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/components/Button' },
    ],
    outline: { level: [2, 4] },
    search: {
      provider: 'local',
    },

    // sidebar: [
    //   {
    //     text: 'components',
    //     items: [
    //       { text: 'Button', link: '  ' },
    //       { text: 'Input', link: '/components/input' },
    //       { text: 'Switch', link: '/components/switch' },
    //       { text: 'Select', link: '/components/select' },
    //       { text: 'Form', link: '/components/form' },
    //     ],
    //   },
    // ],

    // sidebar: [{ text: 'Basics', items: generateSidebar('/components', '../components') }],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
