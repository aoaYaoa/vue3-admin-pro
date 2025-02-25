<template>
  <div class="debug-menu">
    <h3>路由调试信息</h3>
    <pre>{{ JSON.stringify(routes, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取所有路由用于调试
const routes = computed(() => {
  const allRoutes = router.options.routes
  return allRoutes.filter(route => {
    return route.path !== '/login' && 
           route.path !== '/:pathMatch(.*)*' &&
           route.path !== '/'
  })
})
</script>

<style scoped>
.debug-menu {
  padding: 20px;
  background: #f0f0f0;
  color: #333;
  overflow: auto;
  height: 100%;
}

pre {
  white-space: pre-wrap;
  font-size: 12px;
}
</style> 