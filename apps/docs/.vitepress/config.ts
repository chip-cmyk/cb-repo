import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import autoSidebar from '../plugins/autoSidebar/dist'

// console.log(new URL('../../../packages/carbon-ui/src',import.meta.url), 'new URL')
// console.log(import.meta.url, 'import.meta.url')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Carbon-UI',
  description: 'A UI library based Vue 3',
  vite: {
    resolve: {
      alias: {
       '@': fileURLToPath(new URL('../../../packages/carbon-ui/src',import.meta.url)),
      },
    },
    plugins: [
      autoSidebar({
        // rootDir: 'docs', // 可选覆盖默认srcDir
        // basePath: '/', // 可选覆盖默认base
        groups: [
          {
            title: 'Components',
            dir: 'components',
            ignoreFiles: ['internal.md'],
          },
          {
            title: 'Guides',
            dir: 'guides',
            collapsed: true,
          },
        ],
      }) as any,
    ],
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
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],
    outline: { level: [2, 6] },
    search: {
      provider: 'local',
    },

    // sidebar: [
    //   {
    //     text: 'components',
    //     items: [
    //       { text: 'Button', link: '/components/Button' },
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
