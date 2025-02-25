<template>
  <el-tooltip effect="dark" content="切换主题" placement="bottom">
    <div class="theme-switch" @click="toggleTheme">
      <el-icon :size="20" :color="isDark ? '#fff' : '#000'">
        <component :is="isDark ? 'Moon' : 'Sunny'" />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : '')
}
</script>

<style scoped>
.theme-switch {
  @apply cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700;
  transition: background 0.3s;
}
</style> 