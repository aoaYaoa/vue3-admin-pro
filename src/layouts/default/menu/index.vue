<template>
  <div class="sidebar-menu">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        background-color="#000c17"
        text-color="#fff"
        active-text-color="#1890ff"
        router
      >
        <sidebar-item
          v-for="route in filteredRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from '../components/SidebarItem.vue'
import { allRoutes } from '@/router/index'

const route = useRoute()

// 获取当前激活的菜单
const activeMenu = computed(() => {
  const { meta, path } = route
  // 如果设置了激活菜单，则使用
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

// 侧边栏折叠状态
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

// 使用名为routes的变量创建计算属性filteredRoutes，确保没有命名冲突
const filteredRoutes = computed(() => {
  const routes = allRoutes.filter(route => {
    return route.path !== '/login' && 
           route.path !== '/:pathMatch(.*)*' &&
           route.path !== '/'
  });
  
  console.log('Menu filtered routes:', routes.map(r => r.path));
  return routes;
})
</script>

<style scoped>
.sidebar-menu {
  height: 100%;
  background-color: #000c17;
}

/* 自定义滚动条样式 */
:deep(.scrollbar-wrapper) {
  overflow-x: hidden !important;
}

:deep(.el-scrollbar__view) {
  height: 100%;
  padding-bottom: 60px !important;
}

:deep(.el-menu) {
  border-right: none;
  height: 100%;
}
</style> 