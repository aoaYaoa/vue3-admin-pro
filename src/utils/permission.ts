import type { AppRouteRecordRaw } from '@/router/types'

/**
 * 判断用户是否拥有该路由的权限
 * @param route 路由
 * @param roles 用户角色
 */
function hasPermission(route: AppRouteRecordRaw, roles: string[]): boolean {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.roles?.includes(role))
  }
  return true
}

/**
 * 过滤异步路由
 * @param routes 异步路由
 * @param roles 用户角色
 */
export function filterAsyncRoutes(routes: AppRouteRecordRaw[], roles: string[]): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
} 