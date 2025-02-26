import type { RouteRecordRaw } from 'vue-router'
import type { IconConfig } from '@/utils/icons'

// 扩展 meta 类型
interface RouteMeta {
  title?: string
  icon?: IconConfig
  activeMenu?: string
  hidden?: boolean
}

// 扩展路由记录类型
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
} 