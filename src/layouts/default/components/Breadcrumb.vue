<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <!-- 只显示当前路由的名称 -->
      <el-breadcrumb-item>{{ currentRouteName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取当前路由的名称
const currentRouteName = computed(() => {
  return route.meta.title || route.name || ''
})
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 15px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-breadcrumb {
  display: inline-block;
  font-size: 16px;
}
</style> 