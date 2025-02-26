import { defineStore } from 'pinia'

/**
 * 侧边栏状态接口
 */
interface SidebarState {
  opened: boolean
}

/**
 * 应用状态存储模块
 * 管理应用全局状态，如侧边栏状态、设备类型等
 */
export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: true // 侧边栏展开状态
    } as SidebarState,
    device: 'desktop' // 当前设备类型
  }),

  actions: {
    /**
     * 切换侧边栏展开状态
     */
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
    }
  },

  // 持久化配置
  persist: {
    key: 'app', // 存储键名
    paths: ['sidebar.opened'] // 需要持久化的状态路径
  }
}) 