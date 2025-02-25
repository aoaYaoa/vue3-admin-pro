import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getTopicsRoutes } from './menus.js'
import { loadMappedModule } from '@/utils/dynamic-import-helper'
import {
  HomeFilled,
  Setting,
  User,
  Key,
  Document,
  Cpu,
  DataAnalysis,
  Box,
  Connection,
  Menu,
  Briefcase,
  Basketball,
  Monitor,
  Collection,
  Postcard,
  Search
} from '@element-plus/icons-vue'
import { markRaw } from 'vue'

// 定义基础路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { hidden: true, title: '登录' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../layouts/default/index.vue'),
    redirect: '/dashboard/index',
    meta: { title: '首页', icon: 'HomeFilled' },
    children: [
      {
        path: 'index',
        name: 'DashboardIndex',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../layouts/default/index.vue'),
    redirect: '/system/user',
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/system/user/index.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/system/role/index.vue'),
        meta: { title: '角色管理', icon: 'Key' }
      }
    ]
  },
  // 添加404路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/error/404.vue'),
    meta: { hidden: true, title: '404' }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes 
})

// 添加主题路由
const topicsRoutes = getTopicsRoutes();
// 将所有主题路由添加到路由实例
topicsRoutes.forEach(route => {
  router.addRoute(route);
});

// 导出路由数组，便于菜单生成
export const allRoutes = [...routes, ...topicsRoutes];

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 系统名称` : '系统名称'
  
  // 获取用户信息
  const userStore = useUserStore()
  
  // 如果有 token，认为已登录
  const isLoggedIn = !!userStore.token
  
  // 如果访问的是登录页
  if (to.path === '/login') {
    // 已登录则跳转到首页，未登录则继续访问登录页
    isLoggedIn ? next('/') : next()
  } else {
    // 访问非登录页，已登录则通过，未登录则跳转到登录页
    isLoggedIn ? next() : next('/login')
  }
})

// 路由后置守卫
router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})

export default router 