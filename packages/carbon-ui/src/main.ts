import './styles/index.css'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import App from './App.vue'

import carbonUI from '@/index'

config.autoAddCss = false
config.showMissingIcons = true
config.styleDefault = 'solid'
library.add(fas)

const app = createApp(App)
app.use(carbonUI)
app.mount('#app')
