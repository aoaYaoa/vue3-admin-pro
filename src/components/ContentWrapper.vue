<template>
  <div class="content-wrapper-container">
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 20px;
  box-sizing: border-box;
}
</style> 