import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import autoSidebar from '../plugins/autoSidebar/dist'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Carbon-UI',
  description: 'A UI library based Vue 3',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
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
    //     text: 'Basics',
    //     items: [
    //       { text: 'Button', link: '/components/Button' },
    //       { text: 'Input', link: '/components/Input' },
    //       { text: 'Switch', link: '/components/Switch' },
    //       { text: 'Select', link: '/components/Select' },
    //       { text: 'Form', link: '/components/Form' },
    //     ],
    //   },
    // ],

    // sidebar: [{ text: 'Basics', items: generateSidebar('/components', '../components') }],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
