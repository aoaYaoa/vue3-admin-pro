<template>
  <div class="topic-container">  
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>{{ topicTitle }} 题目</h2>
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
          <template #default="{ row }">{{ row.title }}</template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="250">
          <template #default="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag" class="tag-item">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getDifficultyType(row.difficulty)">{{ row.difficulty }}</el-tag>
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
              <div class="topic-description" v-html="currentTopic.description"></div>
            </div>
            
            <el-divider content-position="left">参考答案</el-divider>
            
            <div class="topic-answer" v-html="currentTopic.answer"></div>
            
            <!-- 代码示例 -->
            <div class="code-example" v-if="currentTopic.code">
              <el-divider content-position="left">代码示例</el-divider>
              <pre class="code-block">{{ currentTopic.code }}</pre>
            </div>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { Search } from '@element-plus/icons-vue'

// 保留图标引用，确保它被使用
const searchIcon = Search

// 接收父组件传递的主题标题
const props = defineProps({
  topicTitle: {
    type: String,
    required: true
  }
})

interface Topic {
  id: number
  title: string
  description: string
  answer: string
  tags: string[]
  difficulty: string
  code?: string
}

// 示例题目数据，实际使用时应从API获取
const topicList = ref<Topic[]>([
  {
    id: 1,
    title: '示例题目1',
    description: '这是一个示例题目描述',
    answer: '示例答案',
    tags: ['标签1', '标签2'],
    difficulty: '简单'
  },
  {
    id: 2,
    title: '示例题目2',
    description: '这是另一个示例题目描述',
    answer: '示例答案2',
    tags: ['标签2', '标签3'],
    difficulty: '中等'
  }
])

// 搜索功能
const searchText = ref('')
const filteredTopics = computed(() => {
  if (!searchText.value) return topicList.value
  
  const keyword = searchText.value.toLowerCase()
  return topicList.value.filter(topic => 
    topic.title.toLowerCase().includes(keyword) || 
    topic.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
    topic.description.toLowerCase().includes(keyword)
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

.tag-item {
  margin-right: 5px;
  margin-bottom: 5px;
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
  margin-top: 20px;
}

.topic-description,
.topic-answer {
  line-height: 1.6;
  margin-bottom: 20px;
}

.code-block {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 16px;
  font-family: monospace;
  white-space: pre-wrap;
  overflow-x: auto;
}
</style> 