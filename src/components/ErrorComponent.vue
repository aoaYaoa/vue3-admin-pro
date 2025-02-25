<template>
  <div class="error-container">
    <h2>组件加载失败</h2>
    <p>抱歉，请求的组件无法加载。</p>
    <div class="actions">
      <button @click="goBack">返回上一页</button>
      <button @click="goHome">回到首页</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => router.go(-1);
const goHome = () => router.push('/');
</script>

<style scoped>
.error-container {
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style> 