import { createPinia } from 'pinia'

// 导入各个模块的 store
import { useUserStore } from './user.js'
import { useAppStore } from './app.js'

const store = createPinia()

export {
  useUserStore,
  useAppStore
}

export default store 