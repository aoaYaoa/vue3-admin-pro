<template>
  <div class="app-wrapper">
    <!-- 添加调试信息，帮助确定布局是否正确加载 -->
    <div v-if="debug" class="debug-info">Layout loaded</div>
    
    <!-- 侧边栏 -->
    <Sidebar 
      class="sidebar-container"
      :class="{ 'is-collapse': isCollapsed }"
    />
    
    <!-- 顶部导航栏 - 固定在最外层 -->
    <div 
      class="fixed-header"
      :class="{ 'is-collapse': isCollapsed }"
    >
      <Navbar @toggle-sidebar="toggleSidebar" />
    </div>
    
    <!-- 主内容区 -->
    <div 
      class="main-container"
      :class="{ 'is-collapse': isCollapsed }"
    >
      <AppMain>
        <router-view />
      </AppMain>
    </div>

    <!-- 页脚 - 固定在最外层 -->
    <div 
      class="fixed-footer"
      :class="{ 'is-collapse': isCollapsed }"
    >
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/stores'
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

// 计算主容器样式
const mainContainerStyle = computed(() => ({
  width: `calc(100% - ${isCollapsed.value ? '64px' : '210px'})`,
  transition: 'all 0.3s'
}))

// 切换侧边栏
const toggleSidebar = () => {
  appStore.toggleSidebar()
}

// 退出登录
const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 210px;
  transition: width 0.3s;
  z-index: 1001;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
  // background-color: #001529;

  &.is-collapse {
    width: 64px;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  width: calc(100% - 210px);
  height: 50px;
  transition: width 0.3s;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &.is-collapse {
    width: calc(100% - 64px);
  }
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000;
  width: calc(100% - 210px);
  height: auto;
  transition: width 0.3s;
  background-color: #fff;
  box-shadow: 0 -1px 4px rgba(0, 21, 41, 0.08);

  &.is-collapse {
    width: calc(100% - 64px);
  }
}

.main-container {
  position: fixed;
  top: 50px; // navbar height
  right: 0;
  bottom: 40px; // footer height
  width: calc(100% - 210px);
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;

  &.is-collapse {
    width: calc(100% - 64px);
  }

  :deep(.el-card__body) {
    height: calc(100% - 57px); // 减去 card header 的高度
    overflow-y: auto;
    padding: 0;
  }

  :deep(.el-table) {
    height: 100%;
  }
}

.main-content {
  flex: 1;
  overflow: auto;
  background-color: #f5f7fa;
  padding: 20px;

  :deep(.el-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
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

// 响应式布局
@media screen and (max-width: 768px) {
  .sidebar-container {
    transform: translateX(-100%);
  }

  .fixed-header,
  .fixed-footer,
  .main-container {
    width: 100%;
  }

  .sidebar-container.is-active {
    transform: translateX(0);
  }
}

// 修复 Firefox 下的滚动条问题
@-moz-document url-prefix() {
  .main-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
  }
}
</style> 