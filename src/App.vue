<script setup lang="ts">
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
.app {
  width: 100%;
  height: 100vh;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar-container {
  height: 100%;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  overflow: auto;
}
</style>
