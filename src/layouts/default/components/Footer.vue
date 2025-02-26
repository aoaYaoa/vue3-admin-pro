<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>© {{ currentYear }} Vue Admin Pro. All Rights Reserved.</p>
      <p class="links">
        <a href="#" target="_blank">关于我们</a>
        <span class="divider">|</span>
        <a href="#" target="_blank">使用文档</a>
        <span class="divider">|</span>
        <a href="#" target="_blank">帮助中心</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background-color: #fff;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #eee;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

p {
  margin: 6px 0;
}

.links {
  margin-top: 8px;
}

.links a {
  color: #1890ff;
  text-decoration: none;
}

.links a:hover {
  color: #40a9ff;
}

.divider {
  margin: 0 8px;
  color: #ddd;
}
</style> 