<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>TypeScript 题目</h2>
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
interface Example {
  name: string;
  age: number;
}

function greet(person: Example): string {
  return `Hello, ${person.name}!`;
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

// TypeScript 题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 113,
    title: 'TypeScript 和 JavaScript 的区别',
    tags: ['TypeScript', '基础概念'],
    difficulty: '简单'
  },
  {
    id: 114,
    title: 'TS 定义变量类型的方法',
    tags: ['TypeScript', '类型系统'],
    difficulty: '简单'
  },
  {
    id: 115,
    title: 'TypeScript 类型注解 (Type Annotation)',
    tags: ['TypeScript', '类型注解'],
    difficulty: '简单'
  },
  {
    id: 116,
    title: 'TypeScript 中的类型系统',
    tags: ['TypeScript', '类型系统'],
    difficulty: '中等'
  },
  {
    id: 117,
    title: 'TypeScript 中的接口 (Interface)',
    tags: ['TypeScript', '接口'],
    difficulty: '中等'
  },
  {
    id: 118,
    title: 'TypeScript 接口 (Interface) 与类型别名 (Type)',
    tags: ['TypeScript', '接口', '类型别名'],
    difficulty: '中等'
  },
  {
    id: 119,
    title: '拓扑排序-求模块依赖关系',
    tags: ['算法', '拓扑排序', '依赖关系'],
    difficulty: '困难'
  },
  {
    id: 120,
    title: '求笛卡尔积',
    tags: ['算法', '数学'],
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

