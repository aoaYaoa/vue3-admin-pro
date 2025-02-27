<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AppMain'
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background-color: var(--bg-color);
  height: calc(100vh - var(--navbar-height) - var(--footer-height));
  box-sizing: border-box;

  :deep(.el-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-card__body) {
    flex: 1;
    overflow-y: auto;
    padding: 20px !important;
  }
}

/* 调整过渡效果 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: opacity 0.2s ease;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
}
</style>