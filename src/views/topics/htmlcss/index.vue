<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>HTML + CSS 题目</h2>
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
.example {
  display: flex;
  justify-content: center;
  align-items: center;
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

// HTML+CSS 题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 1,
    title: '什么是重绘，什么是回流（reflow）？',
    tags: ['DOM', '性能优化'],
    difficulty: '中等'
  },
  {
    id: 2,
    title: 'Margin 塌陷问题如何解决？',
    tags: ['CSS', '布局'],
    difficulty: '简单'
  },
  {
    id: 3,
    title: '如何隐藏一个元素',
    tags: ['CSS', '显示隐藏'],
    difficulty: '简单'
  },
  {
    id: 4,
    title: 'overflow 不同值的区别。',
    tags: ['CSS', '样式'],
    difficulty: '简单'
  },
  {
    id: 5,
    title: '三栏布局的实现方式（圣杯布局、双飞翼布局等）',
    tags: ['CSS', '布局'],
    difficulty: '中等'
  },
  {
    id: 6,
    title: 'calc() 方法',
    tags: ['CSS', '计算'],
    difficulty: '简单'
  },
  {
    id: 7,
    title: '实现一个固定长宽div 在各个浏览器下水平垂直居中',
    tags: ['CSS', '布局', '兼容性'],
    difficulty: '中等'
  },
  {
    id: 8,
    title: '渐进增强（progressive enhancement）和优雅降级（graceful degradation）',
    tags: ['CSS', '兼容性', '最佳实践'],
    difficulty: '中等'
  },
  {
    id: 9,
    title: 'iframe 有哪些优缺点及使用场景？',
    tags: ['HTML', '嵌入'],
    difficulty: '简单'
  },
  {
    id: 10,
    title: 'CSS 盒子模型',
    tags: ['CSS', '基础'],
    difficulty: '简单'
  },
  {
    id: 11,
    title: 'HTML5 的特性',
    tags: ['HTML5', '新特性'],
    difficulty: '中等'
  },
  {
    id: 12,
    title: 'CSS3 的特性',
    tags: ['CSS3', '新特性'],
    difficulty: '中等'
  },
  {
    id: 13,
    title: 'CSS 中选择器的优先级',
    tags: ['CSS', '选择器'],
    difficulty: '中等'
  },
  {
    id: 14,
    title: 'HTML5 input 元素 type 属性值',
    tags: ['HTML5', '表单'],
    difficulty: '简单'
  },
  {
    id: 15,
    title: 'CSS 中属性的继承性',
    tags: ['CSS', '继承'],
    difficulty: '中等'
  },
  {
    id: 16,
    title: '画一条 0.5px 的线',
    tags: ['CSS', '技巧'],
    difficulty: '中等'
  },
  {
    id: 17,
    title: 'position 的值',
    tags: ['CSS', '定位'],
    difficulty: '简单'
  },
  {
    id: 18,
    title: '什么是浮动，浮动会引起什么问题，如何清除浮动？',
    tags: ['CSS', '浮动'],
    difficulty: '中等'
  },
  {
    id: 19,
    title: 'line-height 和 height 的区别',
    tags: ['CSS', '文本'],
    difficulty: '简单'
  },
  {
    id: 20,
    title: '设置一个元素的背景颜色',
    tags: ['CSS', '样式'],
    difficulty: '简单'
  },
  {
    id: 21,
    title: 'inline-block、inline 和 block 的区别',
    tags: ['CSS', '布局'],
    difficulty: '简单'
  },
  {
    id: 22,
    title: '为什么 img 是 inline 但有 width 和 height',
    tags: ['HTML', 'CSS', '置换元素'],
    difficulty: '中等'
  },
  {
    id: 23,
    title: 'box-sizing 的作用，如何使用',
    tags: ['CSS', '盒模型'],
    difficulty: '简单'
  },
  {
    id: 24,
    title: 'CSS 实现动画',
    tags: ['CSS', '动画'],
    difficulty: '中等'
  },
  {
    id: 25,
    title: 'transition 和 animation 的区别',
    tags: ['CSS', '动画'],
    difficulty: '中等'
  },
  {
    id: 26,
    title: '如何实现在某个容器中垂直居中一个元素',
    tags: ['CSS', '布局', '居中'],
    difficulty: '中等'
  },
  {
    id: 27,
    title: '如何改变一个 DOM 元素的字体颜色',
    tags: ['CSS', '样式'],
    difficulty: '简单'
  },
  {
    id: 28,
    title: '相对布局和绝对布局，position 属性的理解',
    tags: ['CSS', '定位'],
    difficulty: '中等'
  },
  {
    id: 29,
    title: '弹性盒子 flex 布局',
    tags: ['CSS', '布局'],
    difficulty: '中等'
  },
  {
    id: 30,
    title: 'Less 和 SCSS 的区别',
    tags: ['CSS', '预处理器'],
    difficulty: '中等'
  },
  {
    id: 31,
    title: 'CSS3 伪类，伪元素',
    tags: ['CSS3', '选择器'],
    difficulty: '中等'
  },
  {
    id: 32,
    title: '::before 和 ::after 中双冒号的作用',
    tags: ['CSS', '伪元素'],
    difficulty: '中等'
  },
  {
    id: 33,
    title: '响应式布局的实现方案',
    tags: ['CSS', '响应式设计'],
    difficulty: '中等'
  },
  {
    id: 34,
    title: 'link 标签和 import 标签的区别',
    tags: ['HTML', 'CSS', '性能'],
    difficulty: '中等'
  },
  {
    id: 35,
    title: '块元素、行元素、置换元素的区别',
    tags: ['HTML', 'CSS', '布局'],
    difficulty: '中等'
  },
  {
    id: 36,
    title: '单行元素的文本省略号如何实现',
    tags: ['CSS', '文本'],
    difficulty: '简单'
  },
  {
    id: 37,
    title: 'HTML 语义化标签',
    tags: ['HTML', '语义化'],
    difficulty: '简单'
  },
  {
    id: 38,
    title: 'px, rpx, vw, vh, rem 的区别',
    tags: ['CSS', '单位'],
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

// 题目详情查看 - 将dialog改为drawer
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