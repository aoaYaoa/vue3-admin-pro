<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>业务场景 题目</h2>
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

// 业务场景题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 351,
    title: '页面上有多个按钮，分别发起异步请求，如何实现',
    tags: ['业务场景', '异步', '前端实现'],
    difficulty: '中等'
  },
  {
    id: 352,
    title: '登录无感刷新实现方案',
    tags: ['业务场景', '登录', '用户体验'],
    difficulty: '中等'
  },
  {
    id: 353,
    title: '频繁切换页码，导致页面卡顿的问题',
    tags: ['业务场景', '性能优化', '分页'],
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
  min-height: calc(100vh - 120px); /* 确保最小高度足够 */
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
  height: 100%;
  overflow-y: auto; /* 确保题目详情区域可滚动 */
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

.el-table {
  max-height: calc(100vh - 220px); /* 限制表格最大高度 */
  overflow-y: auto; /* 允许表格内容垂直滚动 */
}

.el-drawer__body {
  overflow: auto; /* 确保抽屉内容可滚动 */
  padding: 0; /* 移除默认内边距 */
}
</style>

