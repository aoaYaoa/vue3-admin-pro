<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <span>{{ userStore.name }}</span>
        </el-form-item>
        
        <el-form-item label="角色">
          <el-tag v-for="role in userStore.roles" :key="role" class="mr-2">
            {{ role }}
          </el-tag>
        </el-form-item>
        
        <el-form-item label="头像">
          <el-avatar :size="100" :src="userStore.avatar" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;
  
  .el-card {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .mr-2 {
    margin-right: 8px;
  }
}
</style> 