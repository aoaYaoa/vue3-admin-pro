import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string
  name: string
  avatar: string
  roles: string[]
  routes: RouteRecordRaw[]
}

export interface AppState {
  sidebar: {
    opened: boolean
  }
} 