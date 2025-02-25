<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>DevOps 题目</h2>
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

// DevOps题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 313,
    title: '设计文档规范',
    tags: ['文档', '规范', '项目管理'],
    difficulty: '中等'
  },
  {
    id: 314,
    title: 'ESLint 的作用',
    tags: ['ESLint', '代码质量', '静态分析'],
    difficulty: '简单'
  },
  {
    id: 315,
    title: 'Git 的基本使用方法',
    tags: ['Git', '版本控制', '基础'],
    difficulty: '简单'
  },
  {
    id: 316,
    title: 'git commit message 规范',
    tags: ['Git', '提交规范', '团队协作'],
    difficulty: '简单'
  },
  {
    id: 317,
    title: 'Git Flow 工作流',
    tags: ['Git', 'Git Flow', '分支管理'],
    difficulty: '中等'
  },
  {
    id: 318,
    title: 'Git 提交文件发生冲突怎么解决',
    tags: ['Git', '冲突解决', '版本控制'],
    difficulty: '中等'
  },
  {
    id: 319,
    title: '本次提交误操作，具体如何撤销',
    tags: ['Git', '撤销操作', '版本回退'],
    difficulty: '中等'
  },
  {
    id: 320,
    title: '查看查看某个文件的历史修改记录',
    tags: ['Git', '历史记录', '文件跟踪'],
    difficulty: '简单'
  },
  {
    id: 321,
    title: '本地工程配置文件，不用提交',
    tags: ['Git', '.gitignore', '配置文件'],
    difficulty: '简单'
  },
  {
    id: 322,
    title: 'git fetch 和 git pull 的区别',
    tags: ['Git', 'fetch', 'pull'],
    difficulty: '中等'
  },
  {
    id: 323,
    title: 'git rebase 和 git merge 的区别',
    tags: ['Git', 'rebase', 'merge'],
    difficulty: '中等'
  },
  {
    id: 324,
    title: 'git reset、git revert 区别',
    tags: ['Git', 'reset', 'revert'],
    difficulty: '中等'
  },
  {
    id: 325,
    title: 'git 跟 svn 有什么区别',
    tags: ['Git', 'SVN', '版本控制'],
    difficulty: '中等'
  },
  {
    id: 326,
    title: '如何解决联调依赖问题',
    tags: ['前后端联调', '依赖管理', '团队协作'],
    difficulty: '中等'
  },
  {
    id: 327,
    title: '关于 DevOps',
    tags: ['DevOps', '开发运维', '持续集成'],
    difficulty: '中等'
  },
  {
    id: 328,
    title: '关于 Docker',
    tags: ['Docker', '容器化', '部署'],
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
