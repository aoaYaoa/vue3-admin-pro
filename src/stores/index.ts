import { useUserStore } from './user'
import { useAppStore } from './app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()

//配置持久化
store.use(piniaPluginPersistedstate)

export {
  useUserStore,
  useAppStore
}

export default store 