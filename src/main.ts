import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import store from './stores/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/variables.scss'
import './style.css'  // Tailwind CSS 基础样式
import './styles/index.scss'
import './styles/icons.css' // 添加图标样式
import { initTheme } from './utils/theme.js'

// 开发环境下使用 mock
if (import.meta.env.MODE === 'development') {
  import('./mock/index.js')
}

const app = createApp(App)
const pinia = createPinia()

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.info('Vue instance:', instance)
  console.info('Error info:', info)
}

app.use(pinia)
app.use(router)
app.use(store)

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)

// 初始化主题
initTheme()

app.mount('#app')
