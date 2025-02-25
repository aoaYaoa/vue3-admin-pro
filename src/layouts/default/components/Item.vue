<template>
  <div class="menu-item">
    <!-- 使用配置的图标 -->
    <span v-if="icon" class="menu-icon" :class="iconConfig.class">
      <span v-html="iconConfig.html"></span>
    </span>
    <!-- 标题 -->
    <span class="menu-title">{{ title || '菜单项' }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getIconConfig } from '@/utils/icons';

const props = defineProps({
  icon: {
    type: [String, Object],
    default: null
  },
  title: {
    type: String,
    default: '菜单项'
  }
});

// 获取图标配置
const iconConfig = computed(() => {
  return getIconConfig(props.title);
});
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.menu-icon {
  margin-right: 10px;
  font-size: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Vue 图标样式 */
.vue-icon, .vue-text {
  color: #42b883;
  font-weight: bold;
}

/* React 图标样式 */
.react-icon, .react-text {
  color: #61dafb;
}

/* HTML/CSS 图标样式 */
.html-icon {
  color: #e44d26;
  font-weight: bold;
  font-size: 14px;
}

/* JavaScript 图标样式 */
.js-icon {
  color: #f7df1e;
  background-color: #000;
  padding: 0 2px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 2px;
}

/* TypeScript 图标样式 */
.ts-icon {
  color: white;
  background-color: #3178c6;
  padding: 0 2px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 2px;
}

.menu-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 