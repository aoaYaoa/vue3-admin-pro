<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-title">页面不存在</div>
      <div class="error-desc">抱歉，您访问的页面不存在或已被删除</div>
      <div class="error-actions">
        <el-button type="primary" @click="goHome">返回首页</el-button>
        <el-button @click="goBack">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--navbar-height));
  background-color: var(--bg-color);

  .error-content {
    text-align: center;
    padding: 40px;
    background: var(--bg-secondary);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
    .error-code {
      font-size: 120px;
      font-weight: bold;
      color: var(--primary-color);
      line-height: 1.2;
      margin-bottom: 24px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error-title {
      font-size: 24px;
      color: var(--text-color);
      margin-bottom: 16px;
      font-weight: 500;
    }

    .error-desc {
      font-size: 16px;
      color: var(--text-secondary);
      margin-bottom: 32px;
    }

    .error-actions {
      display: flex;
      justify-content: center;
      gap: 16px;

      .el-button {
        min-width: 120px;
      }
    }
  }
}

// 暗色主题适配
[data-theme='dark'] .error-page {
  .error-content {
    background: var(--bg-secondary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}
</style> 