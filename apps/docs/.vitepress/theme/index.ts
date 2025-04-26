import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import '@ptpchips/carbon-ui/dist/style.css'
import './custom.css'
import 'virtual:svg-icons-register'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
  },
  ElementPlusContainer,
}
