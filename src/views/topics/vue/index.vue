<template>
  <div class="topic-container">  
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>Vue 生态 题目</h2>
          <el-input
            v-model="searchText"
            placeholder="搜索题目..."
            prefix-icon="Search"
            clearable
            style="width: 300px"
          />
        </div>
      </template>
      
      <el-table
        :data="filteredTopics"
        style="width: 100%"
        row-key="id"
        border
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="title" label="题目" min-width="250">
          <template #default="scope">
            <span class="topic-title">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="200">
          <template #default="scope">
            <el-tag 
              v-for="tag in scope.row.tags" 
              :key="tag"
              class="topic-tag"
              size="small"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100" align="center">
          <template #default="scope">
            <el-tag 
              :type="getDifficultyType(scope.row.difficulty)"
              size="small"
            >
              {{ scope.row.difficulty }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 题目详情抽屉 -->
      <el-drawer
        v-model="drawerVisible"
        :title="currentTopic?.title"
        size="50%"
        direction="rtl"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <div v-if="currentTopic" class="topic-detail-drawer">
          <div class="topic-meta-header">
            <el-tag v-for="tag in currentTopic.tags" :key="tag" class="topic-tag">{{ tag }}</el-tag>
            <el-tag :type="getDifficultyType(currentTopic.difficulty)" class="topic-difficulty">
              {{ currentTopic.difficulty }}
            </el-tag>
          </div>
          
          <el-divider content-position="left">问题详情</el-divider>
          
          <div class="topic-content">
            <div class="topic-question">
              <h3>{{ currentTopic.title }}</h3>
              <p class="topic-description">此题目的详细解答正在准备中...</p>
            </div>
            
            <el-divider content-position="left">参考答案</el-divider>
            
            <div class="topic-answer">
              <p>解答内容正在编写中...</p>
              
              <!-- 可以在这里添加代码示例 -->
              <div class="code-example" v-if="false">
                <el-divider content-position="left">代码示例</el-divider>
                <pre class="code-block">
// 代码示例将在这里显示
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
                </pre>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

interface Topic {
  id: number
  title: string
  tags: string[]
  difficulty: string
}

// Vue生态题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 153,
    title: 'Vue2 不能监听数组下标和对象新增属性的原因',
    tags: ['Vue2', '响应式', '原理'],
    difficulty: '中等'
  },
  {
    id: 154,
    title: 'vue2 和 vue3 的具体区别',
    tags: ['Vue2', 'Vue3', '比较'],
    difficulty: '中等'
  },
  {
    id: 155,
    title: 'vue 的通讯方式',
    tags: ['Vue', '组件通信'],
    difficulty: '简单'
  },
  {
    id: 156,
    title: 'vue 的常用修饰符',
    tags: ['Vue', '修饰符', '指令'],
    difficulty: '简单'
  },
  {
    id: 157,
    title: 'vue2 初始化过程做了什么？',
    tags: ['Vue2', '初始化', '生命周期'],
    difficulty: '中等'
  },
  {
    id: 158,
    title: 'created 和 mounted 的区别',
    tags: ['Vue', '生命周期'],
    difficulty: '简单'
  },
  {
    id: 159,
    title: 'Vue 的 $nextTick 是什么？原理是？',
    tags: ['Vue', 'nextTick', '异步更新'],
    difficulty: '中等'
  },
  {
    id: 160,
    title: '以下两段代码在 vue 中有什么区别?',
    tags: ['Vue', '响应式', '实践'],
    difficulty: '中等'
  },
  {
    id: 161,
    title: '为什么 vue 中的 data 必须是函数?',
    tags: ['Vue', '组件', '数据'],
    difficulty: '简单'
  },
  {
    id: 162,
    title: 'Vue 的父组件和子组件生命周期执行顺序',
    tags: ['Vue', '生命周期', '组件'],
    difficulty: '中等'
  },
  {
    id: 163,
    title: 'watch 和 computed 有什么区别',
    tags: ['Vue', 'watch', 'computed'],
    difficulty: '简单'
  },
  {
    id: 164,
    title: '谈谈 computed 的机制',
    tags: ['Vue', 'computed', '原理'],
    difficulty: '中等'
  },
  {
    id: 165,
    title: '为什么 computed 不支持异步？',
    tags: ['Vue', 'computed', '异步'],
    difficulty: '中等'
  },
  {
    id: 166,
    title: 'Vue3 DOM Diff 算法',
    tags: ['Vue3', 'Virtual DOM', 'Diff算法'],
    difficulty: '困难'
  },
  {
    id: 167,
    title: 'Vue3 的最长递增子序列算法作用',
    tags: ['Vue3', '算法', 'Diff'],
    difficulty: '困难'
  },
  {
    id: 168,
    title: 'vue3 中 ref 和 reactive 的区别',
    tags: ['Vue3', '响应式', 'Composition API'],
    difficulty: '中等'
  },
  {
    id: 169,
    title: 'vue3 区分 ref 和 reactive 的必要性',
    tags: ['Vue3', '响应式', '设计原理'],
    difficulty: '中等'
  },
  {
    id: 170,
    title: 'Vue 响应式 Observer 如何实现',
    tags: ['Vue', '响应式', '原理'],
    difficulty: '困难'
  },
  {
    id: 171,
    title: 'vue3 为什么要用 proxy 替代 defineProperty',
    tags: ['Vue3', 'Proxy', '响应式'],
    difficulty: '中等'
  },
  {
    id: 172,
    title: '什么是虚拟DOM',
    tags: ['Vue', '虚拟DOM', '原理'],
    difficulty: '中等'
  },
  {
    id: 173,
    title: 'vue2的生命周期',
    tags: ['Vue2', '生命周期'],
    difficulty: '简单'
  },
  {
    id: 174,
    title: 'vue3生命周期',
    tags: ['Vue3', '生命周期', 'Composition API'],
    difficulty: '简单'
  },
  {
    id: 175,
    title: 'watch怎么深度监听对象变化',
    tags: ['Vue', 'watch', '深度监听'],
    difficulty: '中等'
  },
  {
    id: 176,
    title: 'vue2删除数组用delete',
    tags: ['Vue2', '数组', '响应式'],
    difficulty: '中等'
  },
  {
    id: 177,
    title: 'Vue3.0编译做了哪些优化',
    tags: ['Vue3', '编译优化', '性能'],
    difficulty: '困难'
  },
  {
    id: 178,
    title: 'Vue3.0新特性——Composition API',
    tags: ['Vue3', 'Composition API', '新特性'],
    difficulty: '中等'
  },
  {
    id: 179,
    title: 'vue要做权限管理该怎么做',
    tags: ['Vue', '权限管理', '实践'],
    difficulty: '中等'
  },
  {
    id: 180,
    title: 'vue项目脚手架',
    tags: ['Vue', '脚手架', '工程化'],
    difficulty: '简单'
  },
  {
    id: 181,
    title: 'Vue-Router 3.x hash模式和history模式',
    tags: ['Vue Router', '路由模式', '实践'],
    difficulty: '中等'
  },
  {
    id: 182,
    title: 'Vue3.5更新 - Props声明',
    tags: ['Vue3.5', 'Props', '新特性'],
    difficulty: '中等'
  },
  {
    id: 183,
    title: 'Vue3.5更新 - useTemplate',
    tags: ['Vue3.5', 'useTemplate', '新特性'],
    difficulty: '中等'
  },
  {
    id: 184,
    title: 'Vue3.5更新 - watch的默认行为',
    tags: ['Vue3.5', 'watch', '新特性'],
    difficulty: '中等'
  }
])

// 搜索功能
const searchText = ref('')
const filteredTopics = computed(() => {
  if (!searchText.value) return topicList.value
  
  const keyword = searchText.value.toLowerCase()
  return topicList.value.filter(
    topic => 
      topic.title.toLowerCase().includes(keyword) || 
      topic.tags.some(tag => tag.toLowerCase().includes(keyword))
  )
})

// 难度颜色映射
const getDifficultyType = (difficulty: string) => {
  switch (difficulty) {
    case '简单': return 'success'
    case '中等': return 'warning'
    case '困难': return 'danger'
    default: return 'info'
  }
}

// 题目详情查看
const drawerVisible = ref(false)
const currentTopic = ref<Topic | null>(null)

const handleRowClick = (row: Topic) => {
  currentTopic.value = row
  drawerVisible.value = true
}

// 添加检查代码确保数据初始化
onMounted(() => {
  console.log('Vue生态题目组件已加载', topicList.value)
})

const route = useRoute()
const isDev = process.env.NODE_ENV === 'development'
const routeInfo = computed(() => JSON.stringify(route, null, 2))

onMounted(() => {
  console.log('Vue topic component mounted', route)
})
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

.topic-title {
  font-weight: 500;
  color: #303133;
  cursor: pointer;
}

.topic-title:hover {
  color: #409eff;
}

.topic-tag {
  margin-right: 5px;
}

/* 抽屉中的样式 */
.topic-detail-drawer {
  padding: 20px;
}

.topic-meta-header {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.topic-difficulty {
  margin-left: auto;
}

.topic-content {
  font-size: 16px;
  line-height: 1.6;
}

.topic-question h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
}

.topic-description {
  color: #606266;
  margin-bottom: 20px;
}

.topic-answer {
  color: #606266;
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