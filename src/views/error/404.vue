<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您请求的页面不存在或已被移动</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.not-found-content {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 72px;
  color: #409eff;
  margin: 0;
}

h2 {
  font-size: 30px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;
}
</style> 