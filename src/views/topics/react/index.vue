<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>React 生态 题目</h2>
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
function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  
  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
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
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

interface Topic {
  id: number
  title: string
  tags: string[]
  difficulty: string
}

// React生态题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 185,
    title: 'React 中为什么要设计 Fiber？',
    tags: ['React', 'Fiber', '原理'],
    difficulty: '困难'
  },
  {
    id: 186,
    title: '组件的生命周期方法。',
    tags: ['React', '生命周期'],
    difficulty: '简单'
  },
  {
    id: 187,
    title: '状态（state）和属性（props）之间有什么区别？',
    tags: ['React', 'state', 'props'],
    difficulty: '简单'
  },
  {
    id: 188,
    title: '高阶组件（Higher-Order Components）是什么？',
    tags: ['React', 'HOC', '设计模式'],
    difficulty: '中等'
  },
  {
    id: 189,
    title: '受控组件和非受控组件',
    tags: ['React', '表单', '组件设计'],
    difficulty: '中等'
  },
  {
    id: 190,
    title: '展示组件(Presentational)和容器组件(Container)',
    tags: ['React', '组件设计', '模式'],
    difficulty: '中等'
  },
  {
    id: 191,
    title: '类组件(Class components)和函数组件(Functional component)',
    tags: ['React', '组件类型'],
    difficulty: '简单'
  },
  {
    id: 192,
    title: '如何划分 技术组件 和 业务组件？',
    tags: ['React', '组件设计', '最佳实践'],
    difficulty: '中等'
  },
  {
    id: 193,
    title: '什么是 React 中的上下文（Context）？',
    tags: ['React', 'Context', '状态管理'],
    difficulty: '中等'
  },
  {
    id: 194,
    title: 'React 是 mvvm 框架吗？',
    tags: ['React', '架构模式', 'MVVM'],
    difficulty: '中等'
  },
  {
    id: 195,
    title: 'React 如何实现 mvvm?',
    tags: ['React', 'MVVM', '实现'],
    difficulty: '中等'
  },
  {
    id: 196,
    title: 'redux 主要解决什么问题？',
    tags: ['Redux', '状态管理'],
    difficulty: '中等'
  },
  {
    id: 197,
    title: 'React 性能优化方案，如何避免不必要的render',
    tags: ['React', '性能优化', 'render'],
    difficulty: '中等'
  },
  {
    id: 198,
    title: '虚拟 DOM 的意义',
    tags: ['React', '虚拟DOM', '原理'],
    difficulty: '中等'
  },
  {
    id: 199,
    title: 'react DOM Diff 算法',
    tags: ['React', 'Diff算法', '虚拟DOM'],
    difficulty: '困难'
  },
  {
    id: 200,
    title: '关于 Fiber 架构',
    tags: ['React', 'Fiber', '架构'],
    difficulty: '困难'
  },
  {
    id: 201,
    title: '关于 Flux',
    tags: ['Flux', '架构', '状态管理'],
    difficulty: '中等'
  },
  {
    id: 202,
    title: 'React 项目脚手架',
    tags: ['React', '工程化', '脚手架'],
    difficulty: '简单'
  },
  {
    id: 203,
    title: 'React 组件可请求数据方案',
    tags: ['React', '数据获取', 'Hooks'],
    difficulty: '中等'
  },
  {
    id: 204,
    title: 'refs 的作用',
    tags: ['React', 'refs', 'DOM操作'],
    difficulty: '简单'
  },
  {
    id: 205,
    title: 'key 在渲染列表时的作用',
    tags: ['React', '列表渲染', '性能优化'],
    difficulty: '简单'
  },
  {
    id: 206,
    title: '如何使用 useState Hook',
    tags: ['React', 'Hooks', 'useState'],
    difficulty: '简单'
  },
  {
    id: 207,
    title: '如何使用 useEffect Hook',
    tags: ['React', 'Hooks', 'useEffect', '生命周期'],
    difficulty: '中等'
  },
  {
    id: 208,
    title: '如何使用自定义Hook',
    tags: ['React', 'Hooks', '自定义Hook'],
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