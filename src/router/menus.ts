import type { AppRouteRecordRaw } from './types'
import getIconConfig, { menuIcons } from '@/utils/icons'
import { defineComponent } from 'vue'
// 定义Layout组件
const Layout = () => import('@/layouts/default/index.vue')

// 获取主题路由
export function getTopicsRoutes(): AppRouteRecordRaw[] {
  const routes: AppRouteRecordRaw[] = [
    {
      path: '/htmlcss',
      component: Layout,
      meta: { 
        title: 'HTML/CSS',
        icon: getIconConfig('HTML/CSS')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/htmlcss/index.vue'),
        meta: { 
          title: 'HTML/CSS 题目',
          icon: getIconConfig('HTML/CSS')
        }
      }]
    },
    {
      path: '/javascript',
      component: Layout,
      meta: { 
        title: 'JavaScript',
        icon: getIconConfig('JavaScript')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/javascript/index.vue'),
        meta: { 
          title: 'JavaScript 题目',
          icon: getIconConfig('JavaScript')
        }
      }]
    },
    {
      path: '/typescript',
      component: Layout,
      meta: { 
        title: 'TypeScript',
        icon: getIconConfig('TypeScript')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/typescript/index.vue'),
        meta: { 
          title: 'TypeScript 题目',
          icon: getIconConfig('TypeScript')
        }
      }]
    },
    {
      path: '/coding',
      component: Layout,
      meta: { 
        title: '编程题',
        icon: getIconConfig('编程题')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/coding/index.vue'),
        meta: { 
          title: '编程题 题目',
          icon: getIconConfig('编程题')
        }
      }]
    },
    {
      path: '/vue',
      component: Layout,
      meta: { 
        title: 'Vue',
        icon: getIconConfig('Vue')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/vue/index.vue'),
        meta: { 
          title: 'Vue 题目',
          icon: getIconConfig('Vue')
        }
      }]
    },
    {
      path: '/react',
      component: Layout,
      meta: { 
        title: 'React',
        icon: getIconConfig('React')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/react/index.vue'),
        meta: { 
          title: 'React 题目',
          icon: getIconConfig('React')
        }
      }]
    },
    {
      path: '/engineering',
      component: Layout,
      meta: { 
        title: '工程化',
        icon: getIconConfig('工程化')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/engineering/index.vue'),
        meta: { 
          title: '工程化 题目',
          icon: getIconConfig('工程化')
        }
      }]
    },
    {
      path: '/flutter',
      component: Layout,
      meta: { 
        title: 'flutter',
        icon: getIconConfig('flutter')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/flutter/index.vue'),
        meta: { 
          title: 'flutter 题目',
          icon: getIconConfig('flutter')
        }
      }]
    },
    {
      path: '/browser',
      component: Layout,
      meta: { 
        title: '浏览器',
        icon: getIconConfig('浏览器')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/browser/index.vue'),
        meta: { 
          title: '浏览器 题目',
          icon: getIconConfig('浏览器')
        }
      }]
    },
    {
      path: '/performance',
      component: Layout,
      meta: { 
        title: '性能优化',
        icon: getIconConfig('性能优化')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/performance/index.vue'),
        meta: { 
          title: '性能优化 题目',
          icon: getIconConfig('性能优化')
        }
      }]
    },
    {
      path: '/design',
      component: Layout,
      meta: { 
        title: '设计模式',
        icon: getIconConfig('设计模式')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/design/index.vue'),
        meta: { 
          title: '设计模式 题目',
          icon: getIconConfig('设计模式')
        }
      }]
    },
   {
    path: '/devops',
    component: Layout,
    meta: { 
      title: 'devops',
      icon: getIconConfig('devops')
    },
    children: [{
      path: '',
      component: () => import('@/views/topics/devops/index.vue'),
      meta: { 
        title: 'devops 题目',
        icon: getIconConfig('devops')
      }
    }]
  },
   
    {
      path: '/os',
      component: Layout,
      meta: { 
        title: '操作系统',
        icon: getIconConfig('操作系统')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/os/index.vue'),
        meta: { 
          title: '操作系统 题目',
          icon: getIconConfig('操作系统')
        }
      }]
    },
    {
      path: '/network',
      component: Layout,
      meta: { 
        title: '计算机网络',
        icon: getIconConfig('计算机网络')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/network/index.vue'),
        meta: { 
          title: '网络 题目',
          icon: getIconConfig('计算机网络')
        }
      }]
    },
    {
      path: '/server',
      component: Layout,
      meta: { 
        title: '服务端',
        icon: getIconConfig('服务端')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/server/index.vue'),
        meta: { 
          title: '服务端 题目',
          icon: getIconConfig('服务端')
        }
      }]
    },
    {
      path: '/database',
      component: Layout,
      meta: { 
        title: '数据库',
        icon: getIconConfig('数据库')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/database/index.vue'),
        meta: { 
          title: '数据库 题目',
          icon: getIconConfig('数据库')
        }
      }]
    },
    {
      path: '/business',
      component: Layout,
      meta: { 
        title: '业务场景',
        icon: getIconConfig('业务场景')
      },
      children: [{
        path: '',
        component: () => import('@/views/topics/business/index.vue'),
        meta: { 
          title: '业务场景 题目',
          icon: getIconConfig('业务场景')
        }
      }]
    },

  ]

  console.log('Routes with icons:', routes.map(r => ({
    path: r.path,
    title: r.meta.title,
    icon: r.meta.icon
  })))

  routes.forEach(route => {
    // console.log(`Route "${route.meta?.title}":`, {
    //   icon: route.meta?.icon,
    //   matched: route.meta?.icon !== menuIcons['default']
    // })
  })

  return routes
}

export default {
  getTopicsRoutes
} 