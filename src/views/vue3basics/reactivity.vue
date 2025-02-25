<template>
  <div class="reactivity-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>Vue3 响应式原理</h3>
        </div>
      </template>
      
      <div class="content">
        <p>Vue3的响应式系统是基于ES6的Proxy来实现的，相比Vue2使用的Object.defineProperty，有着更好的性能和更少的限制。</p>
        
        <h4>响应式原理流程</h4>
        <el-steps :active="4" finish-status="success" direction="vertical">
          <el-step title="创建响应式对象" description="使用Proxy包装原始对象，拦截属性的读取和修改" />
          <el-step title="依赖收集" description="在渲染或计算过程中，记录哪些属性被使用" />
          <el-step title="属性修改" description="当属性被修改时，Proxy的set捕获器会被调用" />
          <el-step title="触发更新" description="通知所有依赖于该属性的地方进行更新" />
        </el-steps>
        
        <h4 class="mt-4">Vue3 vs Vue2 响应式系统</h4>
        <el-table :data="comparisonData" style="width: 100%">
          <el-table-column prop="feature" label="特性" width="180" />
          <el-table-column prop="vue2" label="Vue2" />
          <el-table-column prop="vue3" label="Vue3" />
        </el-table>
        
        <h4 class="mt-4">Proxy 简单示例</h4>
        <pre class="code-block">
// 原始对象
const original = { count: 0 }

// 创建响应式代理
const observed = new Proxy(original, {
  get(target, property, receiver) {
    console.log(`访问了 ${String(property)} 属性`)
    return Reflect.get(target, property, receiver)
  },
  set(target, property, value, receiver) {
    console.log(`设置 ${String(property)} 为 ${value}`)
    return Reflect.set(target, property, value, receiver)
  }
})

// 访问属性会触发get
console.log(observed.count) // 访问了 count 属性 0

// 修改属性会触发set
observed.count = 1 // 设置 count 为 1
        </pre>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const comparisonData = ref([
  { 
    feature: '实现方式', 
    vue2: 'Object.defineProperty', 
    vue3: 'Proxy' 
  },
  { 
    feature: '数组变化检测', 
    vue2: '需要特殊处理', 
    vue3: '完全支持' 
  },
  { 
    feature: '新增属性检测', 
    vue2: '需要使用Vue.set', 
    vue3: '自动检测' 
  },
  { 
    feature: '删除属性检测', 
    vue2: '需要使用Vue.delete', 
    vue3: '自动检测' 
  },
  { 
    feature: '性能', 
    vue2: '递归遍历对象的所有属性', 
    vue3: '懒处理，访问时才做代理' 
  }
])
</script>

<style scoped>
.reactivity-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3, h4 {
  margin-top: 0;
}

h4 {
  margin-top: 20px;
}

.mt-4 {
  margin-top: 20px;
}

.code-block {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
}
</style> 