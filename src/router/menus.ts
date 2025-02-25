import type { AppRouteRecordRaw } from './types'
import { 
  HomeFilled, 
  Setting, 
  User, 
  List,
  InfoFilled,
  Cpu,
  Refresh,
  ChatLineRound,
  Monitor,
  Basketball,
  Box,
  DataAnalysis,
  Briefcase,
  Document as DocumentIcon,
  Collection,
  Connection,
  Menu,
  Key,
  Postcard,
  Promotion,
  Edit,
  Notebook,
  DataLine,
  Grid,
  Moon,
  TrendCharts,
  Share,
  Platform,
  Reading,
  Clock,
  Operation,
  Files
} from '@element-plus/icons-vue'
import { h, defineComponent, markRaw, shallowRef } from 'vue'

// 添加这行来定义Layout组件
const Layout = () => import('@/layouts/default/index.vue')

export interface MenuItem {
  title: string
  icon?: any
  path: string
  children?: MenuItem[]
  hidden?: boolean
}

// 调试函数
function logRoutes(routes: any) {
  console.log('Routes for menu generation:', JSON.stringify(routes, null, 2));
  return routes;
}

// 图标映射 - 根据路径片段自动匹配图标
const iconMap = {
  dashboard: 'HomeFilled',
  system: 'Setting',
  user: 'User',
  role: 'List',
  htmlcss: 'Files',
  javascript: 'DataLine',
  typescript: 'Postcard',
  vue: 'Reading',
  react: 'Basketball',
  database: 'DataAnalysis',
  network: 'Connection',
  engineering: 'Box',
  server: 'Cpu',
  coding: 'Collection',
  business: 'Briefcase',
  browser: 'Monitor',
  performance: 'Clock',
  design: 'Operation',
  os: 'Platform',
  devops: 'Setting'
};

// 修改priorityMap对象，确保菜单按照以下顺序排序
const priorityMap = {
  '/dashboard': 1,
  '/htmlcss': 10,
  '/javascript': 20,
  '/typescript': 30,
  '/coding': 40,
  '/vue': 50,
  '/react': 60,
  '/engineering': 70,
  '/browser': 80,
  '/performance': 90,
  '/design': 100,
  '/os': 110,
  '/network': 120,
  '/devops': 130,
  '/server': 140,
  '/database': 150,
  '/business': 160
};

// 获取主题路由
export function getTopicsRoutes() {
  // 定义路由数组
  const routes = [
    {
      path: '/htmlcss',
      component: Layout,
      meta: {
        title: 'HTML/CSS',
        icon: 'Files'
      },
      children: [
        {
          path: '',
          name: 'HTMLCSSTopics',
          component: () => import('../views/topics/htmlcss/index.vue'),
          meta: {
            title: 'HTML/CSS 题目',
            icon: 'Files'
          }
        }
      ]
    },
    {
      path: '/javascript',
      component: Layout,
      meta: {
        title: 'JavaScript',
        icon: 'DataLine'
      },
      children: [
        {
          path: '',
          name: 'JavaScriptTopics',
          component: () => import('../views/topics/javascript/index.vue'),
          meta: {
            title: 'JavaScript 题目',
            icon: 'DataLine'
          }
        }
      ]
    },
    {
      path: '/typescript',
      component: Layout,
      meta: {
        title: 'TypeScript',
        icon: 'Postcard'
      },
      children: [
        {
          path: '',
          name: 'TypeScriptTopics',
          component: () => import('../views/topics/typescript/index.vue'),
          meta: {
            title: 'TypeScript 题目',
            icon: 'Postcard'
          }
        }
      ]
    },
    {
      path: '/coding',
      component: Layout,
      meta: {
        title: '编程题',
        icon: 'Collection'
      },
      children: [
        {
          path: '',
          name: 'CodingTopics',
          component: () => import('../views/topics/coding/index.vue'),
          meta: {
            title: '编程题 题目',
            icon: 'Collection'
          }
        }
      ]
    },
    {
      path: '/vue',
      component: Layout,
      meta: {
        title: 'Vue',
        icon: 'Reading'
      },
      children: [
        {
          path: '',
          name: 'VueTopics',
          component: () => import('../views/topics/vue/index.vue'),
          meta: {
            title: 'Vue 题目',
            icon: 'Reading'
          }
        }
      ]
    },
    {
      path: '/react',
      component: Layout,
      meta: {
        title: 'React',
        icon: 'Basketball'
      },
      children: [
        {
          path: '',
          name: 'ReactTopics',
          component: () => import('../views/topics/react/index.vue'),
          meta: {
            title: 'React 题目',
            icon: 'Basketball'
          }
        }
      ]
    },
    {
      path: '/engineering',
      component: Layout,
      meta: {
        title: '工程化',
        icon: 'Box'
      },
      children: [
        {
          path: '',
          name: 'EngineeringTopics',
          component: () => import('../views/topics/engineering/index.vue'),
          meta: {
            title: '工程化 题目',
            icon: 'Box'
          }
        }
      ]
    },
    {
      path: '/browser',
      component: Layout,
      meta: {
        title: '浏览器',
        icon: 'Monitor'
      },
      children: [
        {
          path: '',
          name: 'BrowserTopics',
          component: () => import('../views/topics/browser/index.vue'),
          meta: {
            title: '浏览器 题目',
            icon: 'Monitor'
          }
        }
      ]
    },
    {
      path: '/performance',
      component: Layout,
      meta: {
        title: '性能优化',
        icon: 'Clock'
      },
      children: [
        {
          path: '',
          name: 'PerformanceTopics',
          component: () => import('../views/topics/performance/index.vue'),
          meta: {
            title: '性能优化 题目',
            icon: 'Clock'
          }
        }
      ]
    },
    {
      path: '/design',
      component: Layout,
      meta: {
        title: '设计模式',
        icon: 'Operation'
      },
      children: [
        {
          path: '',
          name: 'DesignTopics',
          component: () => import('../views/topics/design/index.vue'),
          meta: {
            title: '设计模式 题目',
            icon: 'Operation'
          }
        }
      ]
    },
    {
      path: '/os',
      component: Layout,
      meta: {
        title: '操作系统',
        icon: 'Platform'
      },
      children: [
        {
          path: '',
          name: 'OSTopics',
          component: () => import('../views/topics/os/index.vue'),
          meta: {
            title: '操作系统 题目',
            icon: 'Platform'
          }
        }
      ]
    },
    {
      path: '/network',
      component: Layout,
      meta: {
        title: '计算机网络',
        icon: 'Connection'
      },
      children: [
        {
          path: '',
          name: 'NetworkTopics',
          component: () => import('../views/topics/network/index.vue'),
          meta: {
            title: '网络 题目',
            icon: 'Connection'
          }
        }
      ]
    },
    {
      path: '/server',
      component: Layout,
      meta: {
        title: '服务端',
        icon: 'Cpu'
      },
      children: [
        {
          path: '',
          name: 'ServerTopics',
          component: () => import('../views/topics/server/index.vue'),
          meta: {
            title: '服务端 题目',
            icon: 'Cpu'
          }
        }
      ]
    },
    {
      path: '/database',
      component: Layout,
      meta: {
        title: '数据库',
        icon: 'DataAnalysis'
      },
      children: [
        {
          path: '',
          name: 'DatabaseTopics',
          component: () => import('../views/topics/database/index.vue'),
          meta: {
            title: '数据库 题目',
            icon: 'DataAnalysis'
          }
        }
      ]
    },
    {
      path: '/business',
      component: Layout,
      meta: {
        title: '业务场景',
        icon: 'Briefcase'
      },
      children: [
        {
          path: '',
          name: 'BusinessTopics',
          component: () => import('../views/topics/business/index.vue'),
          meta: {
            title: '业务场景 题目',
            icon: 'Briefcase'
          }
        }
      ]
    }
  ];

  // 按照priorityMap排序
  return routes.sort((a, b) => {
    const priorityA = priorityMap[a.path] || 999;
    const priorityB = priorityMap[b.path] || 999;
    return priorityA - priorityB;
  });
}

// 从Element图标获取图标组件（不使用markRaw）
export function getElementIcon(name) {
  switch (name) {
    case 'HomeFilled': return HomeFilled;
    case 'Setting': return Setting;
    case 'User': return User;
    case 'List': return List;
    case 'Document': return DocumentIcon;
    case 'DataAnalysis': return DataAnalysis;
    case 'Connection': return Connection;
    case 'Monitor': return Monitor;
    case 'Cpu': return Cpu;
    case 'Box': return Box;
    case 'Collection': return Collection;
    case 'Briefcase': return Briefcase;
    default: return DocumentIcon; // 默认图标
  }
}

// 确保所有路由都有图标
export function ensureRouteIcons(routes) {
  return routes.map(route => {
    if (!route.meta) {
      route.meta = {};
    }

    // 从映射中查找图标，或使用默认图标
    const pathSegment = route.path.split('/').pop();
    if (!route.meta.icon && pathSegment && iconMap[pathSegment]) {
      route.meta.icon = getElementIcon(iconMap[pathSegment]);
    } else if (!route.meta.icon) {
      route.meta.icon = getElementIcon('Document'); // 默认图标
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      route.children = ensureRouteIcons(route.children);
    }

    return route;
  });
}

// 确保图标正确显示的关键函数
export function getIconComponent(iconName: string) {
  // 创建一个映射表，确保每个图标名称都有对应的组件
  const iconComponents = {
    // 首页和系统
    HomeFilled,
    Setting,
    User, 
    List,
    
    // 前端基础
    Files,             // HTML/CSS
    DataLine,          // JavaScript
    Postcard,          // TypeScript
    
    // 框架
    Reading,           // Vue
    Basketball,        // React
    
    // 工程化和浏览器
    Box,               // 工程化
    Monitor,           // 浏览器
    Clock,             // 性能优化
    
    // 设计和系统
    Operation,         // 设计模式
    Platform,          // 操作系统
    
    // 网络和服务端
    Connection,        // 网络
    Cpu,               // 服务器
    DataAnalysis,      // 数据库
    
    // 编程和业务
    Collection,        // 编程题
    Briefcase,         // 业务场景
    
    // 默认图标
    Document: DocumentIcon
  };
  
  // 如果找不到图标，使用默认图标
  return iconComponents[iconName] || iconComponents.Document;
}

// 修改createMenuItems函数确保正确使用图标
export function createMenuItems(routes) {
  if (!routes) return [];
  
  return routes.map(route => {
    const menuItem: MenuItem = {
      title: route.meta?.title || '',
      path: route.path,
      icon: route.meta?.icon ? getIconComponent(route.meta.icon) : null
    };
    
    if (route.children && route.children.length > 0) {
      // 使用递归处理子菜单
      menuItem.children = route.children
        .filter(child => !child.meta?.hidden)
        .map(child => ({
          title: child.meta?.title || '',
          path: child.path ? (route.path + '/' + child.path).replace('//', '/') : route.path,
          icon: child.meta?.icon ? getIconComponent(child.meta.icon) : null
        }));
    }
    
    return menuItem;
  });
}

// 获取图标组件 - 简化版本
export function getIcon(icon) {
  if (!icon) return null;
  
  // 获取正确的图标组件
  const iconMap = {
    Files: markRaw(Files),
    DataLine: markRaw(DataLine),
    Postcard: markRaw(Postcard),
    Collection: markRaw(Collection),
    Reading: markRaw(Reading),
    Basketball: markRaw(Basketball),
    Box: markRaw(Box),
    Monitor: markRaw(Monitor),
    Clock: markRaw(Clock),
    Operation: markRaw(Operation),
    Platform: markRaw(Platform),
    Connection: markRaw(Connection),
    Cpu: markRaw(Cpu),
    DataAnalysis: markRaw(DataAnalysis),
    Briefcase: markRaw(Briefcase),
    // 添加其他图标映射...
    Document: markRaw(DocumentIcon),
    Setting: markRaw(Setting),
    User: markRaw(User),
    List: markRaw(List),
    // 默认图标
    default: markRaw(DocumentIcon)
  };
  
  return iconMap[icon] || iconMap.default;
} 