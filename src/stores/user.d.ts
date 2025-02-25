import { RouteRecordRaw } from 'vue-router'

declare module '@/stores/user' {
  export interface UserState {
    token: string
    name: string
    avatar: string
    roles: string[]
    routes: RouteRecordRaw[]
  }
  
  export const useUserStore: () => {
    state: UserState
    login: (userInfo: { username: string; password: string }) => Promise<void>
    getUserInfo: () => Promise<void>
    generateRoutes: () => Promise<RouteRecordRaw[]>
    resetToken: () => Promise<void>
    logout: () => Promise<void>
  }
} 