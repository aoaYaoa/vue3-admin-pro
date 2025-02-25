<template>
  <div class="intro-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>Vue3 简介</h3>
        </div>
      </template>
      
      <div class="content">
        <h4>Vue3 核心特性</h4>
        <el-divider />
        
        <el-row :gutter="20">
          <el-col :span="24" :md="8">
            <el-card shadow="hover" class="feature-card">
              <h5>Composition API</h5>
              <p>新的组合式API，提供了更灵活的逻辑组织和复用能力</p>
            </el-card>
          </el-col>
          
          <el-col :span="24" :md="8">
            <el-card shadow="hover" class="feature-card">
              <h5>性能提升</h5>
              <p>重写虚拟DOM实现，渲染性能最高提升1.3~2倍</p>
            </el-card>
          </el-col>
          
          <el-col :span="24" :md="8">
            <el-card shadow="hover" class="feature-card">
              <h5>TypeScript支持</h5>
              <p>使用TypeScript编写，提供良好的类型支持</p>
            </el-card>
          </el-col>
        </el-row>
        
        <div class="mt-4">
          <h4>为什么使用Vue3?</h4>
          <el-divider />
          <p>Vue3 提供了更好的性能、更小的体积、更好的TypeScript集成、Composition API等诸多优势。Composition API解决了Vue2中mixins的缺点，提供了更灵活的逻辑复用方式。</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// Vue3 基础介绍
</script>

<style scoped>
.intro-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.feature-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

h5 {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
}

.mt-4 {
  margin-top: 20px;
}
</style> 