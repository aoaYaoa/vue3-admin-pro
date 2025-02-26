<template>
  <el-icon class="menu-custom-icon">
    <span v-if="icon" :class="[icon.class, 'menu-icon-inner']" v-html="icon.html"></span>
  </el-icon>
</template>

<script setup lang="ts">
import type { IconConfig } from '@/utils/icons'
defineProps<{
  icon?: IconConfig
}>()

</script>

<style scoped>
.menu-custom-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.menu-icon-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
}

/* 基础图标样式 */
:deep(.html-icon) {
  color: #e44d26;
  font-weight: bold;
  font-size: 14px;
}

:deep(.js-icon) {
  color: #f7df1e;
  background: #000;
  padding: 1px 4px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: bold;
}

:deep(.ts-icon) {
  color: #fff;
  background: #3178c6;
  padding: 1px 4px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: bold;
}

:deep(.vue-icon) {
  color: #42b883;
  font-weight: bold;
  font-size: 18px;
}

:deep(.react-icon) {
  color: #61dafb;
  font-size: 18px;
}

/* 通用图标大小调整 */
:deep(.engineering-icon),
:deep(.performance-icon),
:deep(.browser-icon),
:deep(.network-icon),
:deep(.coding-icon),
:deep(.design-icon),
:deep(.os-icon),
:deep(.server-icon),
:deep(.database-icon),
:deep(.devops-icon),
:deep(.business-icon) {
  font-size: 18px;
}

/* 系统图标 */
:deep(.system-icon) {
  font-size: 18px;
  color: #a0aec0;
}

:deep(.devops-icon) {
  font-size: 18px;
  color: #2f81f7;  /* GitHub-like blue color */
}
</style> 