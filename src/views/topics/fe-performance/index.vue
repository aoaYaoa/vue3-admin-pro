<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>前端性能 题目</h2>
        </div>
      </template>
      
      <el-empty description="题目列表正在建设中..." />
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 前端性能 题目列表
</script>

<style scoped>
.topic-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 500;
}
</style>
