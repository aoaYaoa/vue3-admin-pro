declare module '@/stores/app' {
  export interface AppState {
    sidebar: {
      opened: boolean
    }
  }

  export const useAppStore: () => {
    state: AppState
    toggleSidebar: () => void
  }
} 