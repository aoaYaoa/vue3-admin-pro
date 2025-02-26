import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/variables.scss'
import './style.css'  // Tailwind CSS 基础样式
import './styles/index.scss'
import './styles/icons.css' // 添加图标样式
import { initTheme } from './utils/theme.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 开发环境下使用 mock
if (import.meta.env.MODE === 'development') {
  import('./mock/index.js')
}

// 初始化 Pinia 状态管理
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 添加持久化插件

// 创建 Vue 应用实例
const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.info('Vue instance:', instance)
  console.info('Error info:', info)
}

// 注册 Pinia 状态管理
app.use(pinia)

// 注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册 Element Plus 组件库
app.use(ElementPlus)

// 注册路由
app.use(router)

// 初始化主题配置
initTheme()

// 挂载应用到 DOM
app.mount('#app')
