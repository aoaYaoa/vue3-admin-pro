<template>
  <div class="navbar">
    <div class="left-menu">
      <div class="hamburger-container" @click="toggleSidebar">
        <el-icon :class="{'is-active': !isCollapsed}">
          <Fold v-if="isCollapsed" />
          <Expand v-else />
        </el-icon>
      </div>
      <breadcrumb class="hide-on-mobile" />
    </div>

    <div class="right-menu">
      <div class="right-menu-item">
        <screenfull />
      </div>
      
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="28" :src="userStore.avatar || ''">
            <el-icon><User /></el-icon>
          </el-avatar>
          <span class="user-name">{{ userStore.name }}</span>
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>
              <span style="margin-left: 5px;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Navbar'
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Breadcrumb from './Breadcrumb.vue'
import { useAppStore } from '../../../stores/app'
import Hamburger from './Hamburger.vue'
import Screenfull from './Screenfull.vue'
import {
  ArrowDown,
  UserFilled,
  SwitchButton,
  User,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const isCollapsed = computed(() => !appStore.sidebar.opened)

const toggleSidebar = () => {
  appStore.toggleSidebar()
  console.log('Sidebar toggled:', isCollapsed.value ? 'collapsed' : 'expanded')
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  padding: 0 16px;

  .left-menu {
    display: flex;
    align-items: center;
    height: 100%;
    
    .hamburger-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;
      cursor: pointer;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.025);
      }
    }
    
    /* 调整面包屑在导航栏中的样式 */
    :deep(.breadcrumb-container) {
      margin-bottom: 0;
      padding: 0;
      box-shadow: none;
      background: transparent;
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  
  .right-menu {
    display: flex;
    align-items: center;
    height: 100%;
    
    .right-menu-item {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 12px;
      cursor: pointer;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.025);
      }
    }
    
    .avatar-container {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      
      .avatar-wrapper {
        display: flex;
        align-items: center;
        padding: 0 12px;
        height: 100%;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }
        
        .user-name {
          margin: 0 8px;
          font-size: 14px;
          color: #606266;
        }
      }
    }
  }
}

.hamburger-container {
  padding: 0 15px;
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  
  .el-icon {
    font-size: 20px;
    
    &.is-active {
      transform: rotate(180deg);
    }
  }
}

@media screen and (max-width: 768px) {
  .hide-on-mobile {
    display: none;
  }
}
</style> 