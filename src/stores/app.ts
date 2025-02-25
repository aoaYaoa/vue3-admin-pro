import { defineStore } from 'pinia'

export interface AppState {
  sidebar: {
    opened: boolean
  }
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    sidebar: {
      opened: localStorage.getItem('sidebarStatus') !== '0'
    }
  }),
  
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      localStorage.setItem('sidebarStatus', this.sidebar.opened ? '1' : '0')
    }
  }
}) 