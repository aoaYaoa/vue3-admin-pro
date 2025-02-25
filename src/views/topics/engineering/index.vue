<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>前端构建 & 工程化 题目</h2>
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
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
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

// 前端构建与工程化题目列表数据
const topicList = ref<Topic[]>([
  // 图片中的题目
  {
    id: 209,
    title: 'webpack 的作用',
    tags: ['Webpack', '工程化', '构建工具'],
    difficulty: '简单'
  },
  {
    id: 210,
    title: 'Webpack 的构建流程',
    tags: ['Webpack', '构建流程', '原理'],
    difficulty: '中等'
  },
  {
    id: 211,
    title: 'Webpack 的热更新原理',
    tags: ['Webpack', 'HMR', '热更新'],
    difficulty: '困难'
  },
  {
    id: 212,
    title: 'webpack 常用 Loader',
    tags: ['Webpack', 'Loader', '工具'],
    difficulty: '简单'
  },
  {
    id: 213,
    title: 'webpack 常用 Plugin',
    tags: ['Webpack', 'Plugin', '工具'],
    difficulty: '简单'
  },
  {
    id: 214,
    title: 'Loader 和 Plugin 的区别',
    tags: ['Webpack', 'Loader', 'Plugin'],
    difficulty: '中等'
  },
  {
    id: 215,
    title: '写一个 loader',
    tags: ['Webpack', 'Loader', '实践'],
    difficulty: '困难'
  },
  {
    id: 216,
    title: '写一个 Plugin',
    tags: ['Webpack', 'Plugin', '实践'],
    difficulty: '困难'
  },
  {
    id: 217,
    title: 'Webpack 构建速度提升',
    tags: ['Webpack', '性能优化', '构建速度'],
    difficulty: '中等'
  },
  {
    id: 218,
    title: 'Webpack 神奇注释',
    tags: ['Webpack', '魔法注释', '代码分割'],
    difficulty: '中等'
  },
  {
    id: 219,
    title: 'webpack 分包案例',
    tags: ['Webpack', '代码分割', '实践'],
    difficulty: '中等'
  },
  {
    id: 220,
    title: 'Webpack 和 Vite 的区别',
    tags: ['Webpack', 'Vite', '对比'],
    difficulty: '中等'
  },
  {
    id: 221,
    title: 'Babel 的原理',
    tags: ['Babel', '转译', '原理'],
    difficulty: '困难'
  },
  {
    id: 222,
    title: '模块化与组件化的区别',
    tags: ['模块化', '组件化', '架构'],
    difficulty: '中等'
  },
  {
    id: 223,
    title: 'CommonJS 与 ESM（ES Module）的区别',
    tags: ['模块化', 'CommonJS', 'ESM'],
    difficulty: '中等'
  },
  {
    id: 224,
    title: '关于服务端渲染（SSR）',
    tags: ['SSR', '服务端渲染', '性能'],
    difficulty: '中等'
  },
  {
    id: 225,
    title: '单页面应用（SPA）与多页面应用（MPA）的区别',
    tags: ['SPA', 'MPA', '架构'],
    difficulty: '中等'
  },
  
  // 补充的 Vite 相关题目
  {
    id: 226,
    title: 'Vite 的作用与优势',
    tags: ['Vite', '构建工具', 'ESM'],
    difficulty: '简单'
  },
  {
    id: 227,
    title: 'Vite 的构建流程',
    tags: ['Vite', '构建流程', '原理'],
    difficulty: '中等'
  },
  {
    id: 228,
    title: 'Vite 的热更新原理',
    tags: ['Vite', 'HMR', '热更新'],
    difficulty: '困难'
  },
  {
    id: 229,
    title: 'Vite 常用插件',
    tags: ['Vite', '插件', '工具'],
    difficulty: '简单'
  },
  {
    id: 230,
    title: '如何编写 Vite 插件',
    tags: ['Vite', '插件', '实践'],
    difficulty: '困难'
  },
  {
    id: 231,
    title: 'Vite 中的预构建功能',
    tags: ['Vite', '预构建', '依赖优化'],
    difficulty: '中等'
  },
  {
    id: 232,
    title: 'Vite 项目性能优化策略',
    tags: ['Vite', '性能优化', '实践'],
    difficulty: '中等'
  },
  {
    id: 233,
    title: 'Rollup 与 Vite 的关系',
    tags: ['Vite', 'Rollup', '构建工具'],
    difficulty: '中等'
  },
  {
    id: 234,
    title: 'Vite 与传统构建工具的加载性能对比',
    tags: ['Vite', '性能', '加载速度'],
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