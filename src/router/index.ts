import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getTopicsRoutes } from './menus'
import Layout from '@/layouts/default/index.vue'

// 基础路由（不需要认证）
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { requiresAuth: false }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...baseRoutes,
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: { 
            title: '首页', 
            icon: 'HomeFilled',
            requiresAuth: true 
          }
        },
        // 其他需要在 Layout 中显示的路由都作为 children
        ...getTopicsRoutes()
      ]
    },
    // 404 路由放在最后
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/404'
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  
  const token = localStorage.getItem('token')
  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth)

  if (!isAuthRequired) {
    // 不需要认证的页面
    if (token && to.path === '/login') {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    // 需要认证的页面
    if (token) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router 