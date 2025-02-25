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

// 前端性能题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 228,
    title: '性能优化相关的参考指标',
    tags: ['性能优化', '指标', '前端'],
    difficulty: '中等'
  },
  {
    id: 229,
    title: 'performance 对象',
    tags: ['性能', 'API', '浏览器'],
    difficulty: '中等'
  },
  {
    id: 230,
    title: 'webpack 优化前端性能',
    tags: ['webpack', '性能优化', '构建工具'],
    difficulty: '中等'
  },
  {
    id: 231,
    title: '如何实现长缓存',
    tags: ['缓存', '性能优化', 'HTTP'],
    difficulty: '中等'
  },
  {
    id: 232,
    title: '要遍历 100000000 项数据，如何优化',
    tags: ['性能优化', '大数据', '算法'],
    difficulty: '困难'
  },
  {
    id: 233,
    title: 'webWorker 优化 1000 万数据的计算',
    tags: ['WebWorker', '多线程', '性能优化'],
    difficulty: '困难'
  },
  {
    id: 234,
    title: '延迟加载的方式有哪些',
    tags: ['延迟加载', '性能优化', '加载策略'],
    difficulty: '中等'
  },
  {
    id: 235,
    title: '图片懒加载和预加载的区别',
    tags: ['图片优化', '懒加载', '预加载'],
    difficulty: '简单'
  },
  {
    id: 236,
    title: '加载大量图片优化方案',
    tags: ['图片优化', '性能优化', '加载策略'],
    difficulty: '中等'
  },
  {
    id: 237,
    title: 'CDN 能加速访问资源的原理',
    tags: ['CDN', '网络优化', '分发'],
    difficulty: '中等'
  },
  {
    id: 238,
    title: '浏览器的渲染过程，DOM 树和渲染树的区别',
    tags: ['浏览器渲染', 'DOM', '渲染树'],
    difficulty: '中等'
  },
  {
    id: 239,
    title: '浏览器输入 URL 到页面加载的全过程',
    tags: ['浏览器', '网络', '渲染'],
    difficulty: '中等'
  },
  {
    id: 240,
    title: '列表无限滚动，页面逐渐卡顿如何解决',
    tags: ['性能优化', '无限滚动', 'DOM'],
    difficulty: '中等'
  },
  {
    id: 241,
    title: '虚拟列表，如果子元素高度不固定如何处理',
    tags: ['虚拟列表', '性能优化', '动态高度'],
    difficulty: '困难'
  },
  {
    id: 242,
    title: '域名发散',
    tags: ['HTTP', '网络优化', '资源加载'],
    difficulty: '简单'
  },
  {
    id: 243,
    title: '域名收敛',
    tags: ['HTTP', '网络优化', '资源加载'],
    difficulty: '简单'
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