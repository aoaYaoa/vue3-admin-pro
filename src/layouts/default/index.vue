<template>
  <div class="app-wrapper">
    <!-- 添加调试信息，帮助确定布局是否正确加载 -->
    <div v-if="debug" class="debug-info">Layout loaded</div>
    
    <!-- 侧边栏 -->
    <Sidebar 
      :is-collapse="isCollapsed" 
      class="sidebar-container"
      :style="{ width: isCollapsed ? '64px' : '210px' }"
    />
    
    <!-- 主内容区 -->
    <div class="main-container" :style="mainContainerStyle">
      <!-- 顶部导航栏 -->
      <Navbar @toggle-sidebar="toggleSidebar" />
      
      <!-- 主内容区域 - 移除面包屑组件 -->
      <div class="content-container">
        <AppMain />
      </div>
      
      <!-- 页脚 -->
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useAppStore } from '@/stores/app.js'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AppMain from './components/AppMain.vue'
import Breadcrumb from './components/Breadcrumb.vue'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

// 使用appStore中的状态
const isCollapsed = computed(() => !appStore.sidebar.opened)
const debug = ref(process.env.NODE_ENV === 'development')
const route = useRoute()

// 计算主容器样式
const mainContainerStyle = computed(() => {
  const sidebarWidth = isCollapsed.value ? '64px' : '210px';
  return {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth})`
  };
});

// 切换侧边栏
const toggleSidebar = () => {
  appStore.toggleSidebar()
  console.log('Sidebar toggled:', isCollapsed.value ? 'collapsed' : 'expanded');
}

// 退出登录
const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.sidebar-container {
  height: 100%;
  transition: width 0.3s;
  z-index: 1001;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  transition: margin-left 0.3s, width 0.3s;
}

.content-container {
  padding: 15px 20px;
  flex: 1;
  overflow: auto;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.debug-info {
  position: fixed;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  z-index: 9999;
}
</style> 