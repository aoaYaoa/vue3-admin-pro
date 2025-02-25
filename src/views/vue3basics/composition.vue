<template>
  <div class="composition-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>Composition API</h3>
        </div>
      </template>
      
      <div class="content">
        <h4>1. 什么是Composition API</h4>
        <p>Composition API是Vue3引入的一种新的编写组件的方式，它允许我们使用函数式的API来构建组件，使代码更具逻辑性和复用性。</p>
        
        <h4>2. 核心API</h4>
        <el-table :data="coreApis" style="width: 100%">
          <el-table-column prop="name" label="API" width="180" />
          <el-table-column prop="description" label="描述" />
        </el-table>
        
        <h4 class="mt-4">3. 基本用法示例</h4>
        <el-divider />
        <pre class="code-block">
import { ref, reactive, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    // 响应式状态
    const count = ref(0)
    const user = reactive({
      name: 'John',
      age: 30
    })
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 侦听器
    watch(count, (newVal, oldVal) => {
      console.log(`Count changed from ${oldVal} to ${newVal}`)
    })
    
    // 生命周期钩子
    onMounted(() => {
      console.log('Component mounted')
    })
    
    // 返回需要暴露给模板的内容
    return {
      count,
      user,
      doubleCount
    }
  }
}
        </pre>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const coreApis = ref([
  { name: 'ref', description: '创建一个响应式的数据引用' },
  { name: 'reactive', description: '创建一个响应式对象' },
  { name: 'computed', description: '创建一个计算属性' },
  { name: 'watch', description: '侦听一个或多个响应式数据源' },
  { name: 'watchEffect', description: '立即运行一个函数，同时响应式地追踪其依赖' },
  { name: 'onMounted', description: '组件挂载完成后执行的钩子函数' }
])
</script>

<style scoped>
.composition-container {
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