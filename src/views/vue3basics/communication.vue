<template>
  <div class="communication-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>Vue3 组件通信</h3>
        </div>
      </template>
      
      <div class="content">
        <p>Vue3提供了多种组件间通信方式，满足不同场景的需求。</p>
        
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Props & Emits" name="props">
            <h4>Props & Emits</h4>
            <p>最基本的父子组件通信方式：父组件通过props向子组件传递数据，子组件通过emits向父组件发送事件。</p>
            <div class="code-container">
              <h5>父组件：</h5>
              <pre class="code-block">
&lt;template&gt;
  &lt;ChildComponent 
    :message="parentMessage" 
    @update="handleUpdate" 
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentMessage = ref('Hello from parent')
const handleUpdate = (msg) =&gt; {
  console.log('Received from child:', msg)
}
&lt;/script&gt;
              </pre>
              
              <h5>子组件：</h5>
              <pre class="code-block">
&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;{{ message }}&lt;/p&gt;
    &lt;button @click="sendToParent"&gt;发送到父组件&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
const props = defineProps({
  message: String
})

const emits = defineEmits(['update'])

const sendToParent = () =&gt; {
  emits('update', 'Hello from child')
}
&lt;/script&gt;
              </pre>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="Provide & Inject" name="provide">
            <h4>Provide & Inject</h4>
            <p>适合跨多级组件传递数据，祖先组件提供数据，后代组件注入使用。</p>
            <div class="code-container">
              <h5>祖先组件：</h5>
              <pre class="code-block">
&lt;script setup&gt;
import { provide, ref } from 'vue'

const themeColor = ref('dark')
provide('theme', themeColor)
&lt;/script&gt;
              </pre>
              
              <h5>后代组件：</h5>
              <pre class="code-block">
&lt;script setup&gt;
import { inject } from 'vue'

const theme = inject('theme', 'light') // 提供默认值
&lt;/script&gt;
              </pre>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="Pinia状态管理" name="pinia">
            <h4>Pinia 状态管理</h4>
            <p>适合复杂应用中的全局状态管理，Vue3官方推荐的状态管理库。</p>
            <div class="code-container">
              <h5>定义Store：</h5>
              <pre class="code-block">
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
              </pre>
              
              <h5>在组件中使用：</h5>
              <pre class="code-block">
&lt;script setup&gt;
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ counterStore.count }}&lt;/p&gt;
    &lt;p&gt;Double: {{ counterStore.doubleCount }}&lt;/p&gt;
    &lt;button @click="counterStore.increment"&gt;+1&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;
              </pre>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('props')
</script>

<style scoped>
.communication-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3, h4, h5 {
  margin-top: 0;
}

h4 {
  margin-top: 15px;
  margin-bottom: 15px;
}

h5 {
  margin-top: 15px;
  margin-bottom: 5px;
}

.code-container {
  margin-top: 15px;
}

.code-block {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow-x: auto;
  margin-top: 5px;
}
</style> 