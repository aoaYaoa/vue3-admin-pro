<template>
  <div class="sidebar-container" :style="{ width: isCollapse ? '64px' : '210px' }">
    <!-- 专业管理系统Logo样式 -->
    <div class="logo-container" :class="{ collapse: isCollapse }">
      <img class="logo" src="@/assets/vue.svg" alt="Logo" />
      <h1 class="title" v-show="!isCollapse">Vue Admin Pro</h1>
    </div>

    <!-- 带滚动条的菜单区域 -->
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        background-color="#1f2937"
        text-color="#a0aec0"
        active-text-color="#ffffff"
        mode="vertical"
        router
      >
        <!-- 首页 -->
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        
        <!-- 系统管理 -->
        <el-sub-menu index="/system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/user">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/system/role">
            <el-icon><List /></el-icon>
            <span>角色管理</span>
          </el-menu-item>
        </el-sub-menu>
        
        <!-- 题目菜单项 - 直接遍历路由配置 -->
        <template v-for="route in filteredRoutes" :key="route.path">
          <!-- 如果有子路由且需要显示为子菜单 -->
          <el-sub-menu v-if="route.children && route.children.length > 0 && route.meta && route.meta.title" :index="route.path">
            <template #title>
              <el-icon>
                <component :is="getIcon(route.meta.icon)" />
              </el-icon>
              <span>{{ route.meta.title }}</span>
            </template>
            
            <!-- 子菜单项 -->
            <el-menu-item 
              v-for="child in route.children" 
              :key="child.path"
              :index="route.path + '/' + child.path"
            >
              <el-icon v-if="child.meta && child.meta.icon">
                <component :is="getIcon(child.meta.icon)" />
              </el-icon>
              <template #title>{{ child.meta ? child.meta.title : '' }}</template>
            </el-menu-item>
          </el-sub-menu>
          
          <!-- 如果是单个路由 -->
          <el-menu-item 
            v-else-if="route.meta && route.meta.title" 
            :index="route.path"
          >
            <el-icon v-if="route.meta.icon">
              <component :is="getIcon(route.meta.icon)" />
            </el-icon>
            <template #title>{{ route.meta.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
      
      <!-- 添加底部空白元素 -->
      <div style="height: 120px;"></div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sidebar'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { 
  HomeFilled, 
  Setting, 
  User, 
  List,
  Document as DocumentIcon,
  Collection,
  Box,
  Monitor,
  Cpu,
  DataAnalysis,
  Connection,
  Reading,
  Basketball,
  Clock,
  Operation,
  Platform,
  Briefcase,
  Files,
  DataLine,
  Postcard
} from '@element-plus/icons-vue'
import { getTopicsRoutes } from '@/router/menus'

const route = useRoute()
const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened)

// 获取当前激活的菜单
const activeMenu = computed(() => {
  const { meta, path } = route
  // 如果设置了高亮路径，则使用设置的高亮路径
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})

// 从路由配置中获取菜单项
const filteredRoutes = computed(() => {
  return getTopicsRoutes()
})

// 处理菜单项的图标
const getIcon = (icon) => {
  if (!icon) return DocumentIcon
  
  // 图标映射
  const iconMap = {
    'HomeFilled': HomeFilled,
    'Setting': Setting,
    'User': User,
    'List': List,
    'Document': DocumentIcon,
    'Collection': Collection,
    'Box': Box,
    'Monitor': Monitor,
    'Cpu': Cpu,
    'DataAnalysis': DataAnalysis,
    'Connection': Connection,
    'Reading': Reading,
    'Basketball': Basketball,
    'Clock': Clock,
    'Operation': Operation,
    'Platform': Platform,
    'Briefcase': Briefcase,
    'Files': Files,
    'DataLine': DataLine,
    'Postcard': Postcard
  }
  
  return iconMap[icon] || DocumentIcon
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  background-color: #1f2937;
  transition: width 0.3s;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  background-color: #131722;
}

.logo {
  width: 32px;
  height: 32px;
}

.title {
  margin-left: 10px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
}

/* 确保菜单项样式一致 */
:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu--collapse) {
  width: 64px;
}

:deep(.el-menu-item), :deep(.el-sub-menu__title) {
  height: 56px;
  line-height: 56px;
}

:deep(.el-menu-item.is-active) {
  background-color: #3182ce !important;
}

:deep(.el-menu-item:hover), :deep(.el-sub-menu__title:hover) {
  background-color: #2d3748 !important;
}

:deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: #ffffff !important;
}
</style> 