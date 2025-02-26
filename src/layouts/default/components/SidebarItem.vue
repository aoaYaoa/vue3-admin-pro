<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 如果只有一个子路由且不需要嵌套菜单，直接渲染菜单项 -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.children.length === 0) && !item.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
        <el-icon v-if="onlyOneChild.meta?.icon">
          <component :is="getIconComponent(onlyOneChild.meta.icon)" />
        </el-icon>
        <template #title>{{ onlyOneChild.meta?.title }}</template>
      </el-menu-item>
    </template>

    <!-- 如果有多个子路由，使用嵌套子菜单 -->
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="getIconComponent(item.meta.icon)" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import path from 'path-browserify'
import * as ItemModule from './Item.vue'
import * as LinkModule from './Link.vue'
import * as ElementPlusIcons from '@element-plus/icons-vue'

// 使用 TypeScript 类型
interface Route {
  path: string;
  name?: string;
  meta?: {
    title?: string;
    icon?: string | any;
    hidden?: boolean;
  };
  children?: Route[];
}

// 获取图标组件
const getIconComponent = (iconName: string) => {
  // 转换图标名称格式：kebab-case → PascalCase
  const formattedName = iconName
    .replace(/(^\w|-\w)/g, (match) => 
      match.replace(/-/, '').toUpperCase()
    )
  
  console.log('Icon mapping:', iconName, '→', formattedName)
  
  return ElementPlusIcons[formattedName as keyof typeof ElementPlusIcons]
}

// 使用 prop 定义组件属性
const props = defineProps({
  // 路由项
  item: {
    type: Object,
    required: true
  },
  // 是否为嵌套菜单
  isNest: {
    type: Boolean,
    default: false
  },
  // 基础路径
  basePath: {
    type: String,
    default: ''
  }
})

// 用于存储唯一子路由
const onlyOneChild = ref<Route | null>(null)

// 判断是否只有一个子路由
const hasOneShowingChild = (children: any[] = [], parent: any) => {
  if (!children) {
    children = [];
  }

  // 过滤掉隐藏的子路由
  const showingChildren = children.filter(item => {
    if (item.meta?.hidden) {
      return false
    } else {
      return true
    }
  })

  // 如果只有一个子路由，则直接显示子路由
  if (showingChildren.length === 1) {
    onlyOneChild.value = showingChildren[0]
    return true
  }

  // 如果没有子路由，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

// 解析路径
const resolvePath = (routePath: string) => {
  // 如果路径为空，使用基础路径（这对空子路由很重要）
  if (!routePath) return props.basePath;
  
  // 如果是外部链接
  if (routePath.startsWith('http')) {
    return routePath
  }
  
  // 如果是绝对路径
  if (routePath.startsWith('/')) {
    return routePath
  }
  
  // 如果是相对路径
  return path.resolve(props.basePath, routePath)
}

// 如果需要特定的排序规则，可以添加一个排序函数
const sortRoutes = (routes: any[]) => {
  // 复制路由数组，避免修改原数组
  const sortedRoutes = [...routes]
  
  // 定义路由的优先级映射
  const priorityMap = {
    '/dashboard': 1,
    '/system': 2,
    '/htmlcss': 3,
    '/javascript': 4,
    '/typescript': 5,
    '/vue': 6,
    '/react': 7,
    '/database': 8,
    '/network': 9, 
    '/engineering': 10,
    '/server': 11,
    '/coding': 12,
    '/business': 13
  }
  
  // 根据优先级排序
  return sortedRoutes.sort((a, b) => {
    const priorityA = priorityMap[a.path] || 999
    const priorityB = priorityMap[b.path] || 999
    return priorityA - priorityB
  })
}

// 然后在适当的地方使用这个函数，例如：
// const sortedMenuRoutes = sortRoutes(menuRoutes.value)

// Use the imported modules
const Item = ItemModule
const AppLink = LinkModule
</script> 