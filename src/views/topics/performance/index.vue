<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>前端性能 题目</h2>
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
            </div>
            
            <el-divider content-position="left">参考答案</el-divider>
            
            <div class="topic-answer">
              <div v-if="currentTopic.answer" v-html="renderMarkdown(currentTopic.answer)" class="markdown-content"></div>
              <p v-else>暂无参考答案</p>
              
              <div v-if="currentTopic.code" class="code-example">
                <el-divider content-position="left">代码示例</el-divider>
                <CodeBlock :code="currentTopic.code" language="javascript" />
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
// import { Search } from '@element-plus/icons-vue'
import { topicList } from './data'
import { renderMarkdown } from '@/utils/markdown-parser'
import { CodeBlock } from '@/components'
import { ElDivider } from 'element-plus'
interface Topic {
  id: number
  title: string
  tags: string[]
  difficulty: string,
  answer?: string,
  code?: string
}



// 搜索功能
const searchText = ref('')
const filteredTopics = computed(() => {
  if (!searchText.value) return topicList
  
  const keyword = searchText.value.toLowerCase()
  return topicList.filter(
    (topic: Topic) => 
      topic.title.toLowerCase().includes(keyword) || 
      topic.tags.some((tag: string) => tag.toLowerCase().includes(keyword))
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

.markdown-content {
  line-height: 1.6;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 500;
  color: #333;
}

.markdown-content :deep(h3) {
  font-size: 1.3em;
  margin-top: 0.8em;
  margin-bottom: 0.4em;
}

.markdown-content :deep(p) {
  margin: 0.8em 0;
}

.markdown-content :deep(pre) {
  background-color: #f5f7fa;
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content :deep(code) {
  background-color: #f5f7fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}
</style> 