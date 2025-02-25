import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/variables.scss'
import './style.css'  // Tailwind CSS 基础样式
import './styles/index.scss'
import './styles/icons.css' // 添加图标样式
import { initTheme } from './utils/theme'

// 开发环境下使用 mock
if (import.meta.env.MODE === 'development') {
  import('./mock')
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
app.use(ElementPlus)

// 初始化主题
initTheme()

app.mount('#app')
