<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>计算机网络 题目</h2>
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

// 计算机网络题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 276,
    title: 'HTTP 请求方式',
    tags: ['HTTP', '网络协议', '基础'],
    difficulty: '简单'
  },
  {
    id: 277,
    title: 'Get / Post 的区别',
    tags: ['HTTP', '请求方法', '网络协议'],
    difficulty: '简单'
  },
  {
    id: 278,
    title: 'RESTful 规范',
    tags: ['REST', 'API设计', '网络架构'],
    difficulty: '中等'
  },
  {
    id: 279,
    title: '浏览器缓存（强缓存 / 协商缓存）',
    tags: ['缓存', '浏览器', 'HTTP'],
    difficulty: '中等'
  },
  {
    id: 280,
    title: 'Cache-Control 的取值',
    tags: ['HTTP', '缓存', '请求头'],
    difficulty: '中等'
  },
  {
    id: 281,
    title: '常见的 HTTP 状态码以及含义',
    tags: ['HTTP', '状态码', '网络协议'],
    difficulty: '中等'
  },
  {
    id: 282,
    title: '网络状态 301、302、307 的区别',
    tags: ['HTTP', '重定向', '状态码'],
    difficulty: '中等'
  },
  {
    id: 283,
    title: '400 和 401、403 状态码的区别',
    tags: ['HTTP', '状态码', '权限'],
    difficulty: '中等'
  },
  {
    id: 284,
    title: 'Http 和 Https 的区别',
    tags: ['HTTP', 'HTTPS', '安全'],
    difficulty: '简单'
  },
  {
    id: 285,
    title: '描述一下 HTTPS 的加密过程',
    tags: ['HTTPS', '加密', 'SSL/TLS'],
    difficulty: '困难'
  },
  {
    id: 286,
    title: 'Cookie 为了解决什么问题而存在',
    tags: ['Cookie', 'HTTP', '状态管理'],
    difficulty: '简单'
  },
  {
    id: 287,
    title: 'Cookie 和 Session 的区别',
    tags: ['Cookie', 'Session', '状态管理'],
    difficulty: '中等'
  },
  {
    id: 288,
    title: 'TCP（传输控制协议）的特点',
    tags: ['TCP', '网络协议', '传输层'],
    difficulty: '中等'
  },
  {
    id: 289,
    title: 'TCP 三次握手',
    tags: ['TCP', '连接建立', '网络协议'],
    difficulty: '中等'
  },
  {
    id: 290,
    title: '如果 TCP 变成二次握手会怎样',
    tags: ['TCP', '连接建立', '网络安全'],
    difficulty: '中等'
  },
  {
    id: 291,
    title: 'TCP 的四次挥手',
    tags: ['TCP', '连接终止', '网络协议'],
    difficulty: '中等'
  },
  {
    id: 292,
    title: '描述一下 TCP 的拥塞控制',
    tags: ['TCP', '拥塞控制', '流量控制'],
    difficulty: '困难'
  },
  {
    id: 293,
    title: '什么是跨域? 如何解决?',
    tags: ['跨域', 'CORS', '同源策略'],
    difficulty: '中等'
  },
  {
    id: 294,
    title: '同源策略具体限制的具体行为',
    tags: ['同源策略', '安全', '浏览器'],
    difficulty: '中等'
  },
  {
    id: 295,
    title: '发起请求是浏览器做了什么',
    tags: ['浏览器', 'HTTP', '网络请求'],
    difficulty: '中等'
  },
  {
    id: 296,
    title: 'XSS 攻击是什么?',
    tags: ['网络安全', 'XSS', 'Web攻击'],
    difficulty: '中等'
  },
  {
    id: 297,
    title: 'SQL 注入',
    tags: ['网络安全', 'SQL注入', '数据库安全'],
    difficulty: '中等'
  },
  {
    id: 298,
    title: 'DDoS 攻击',
    tags: ['网络安全', 'DDoS', '拒绝服务攻击'],
    difficulty: '中等'
  },
  {
    id: 299,
    title: 'CSRF 攻击',
    tags: ['网络安全', 'CSRF', 'Web攻击'],
    difficulty: '中等'
  },
  {
    id: 300,
    title: 'Ajax 的定义及优缺点',
    tags: ['AJAX', '前端技术', '异步通信'],
    difficulty: '简单'
  },
  {
    id: 301,
    title: 'XMLHttpRequest 对象',
    tags: ['AJAX', 'XMLHttpRequest', '前端技术'],
    difficulty: '中等'
  },
  {
    id: 302,
    title: '封装一个 ajax 请求方法',
    tags: ['AJAX', '前端技术', '代码实现'],
    difficulty: '中等'
  },
  {
    id: 303,
    title: 'Fetch API',
    tags: ['Fetch', '前端技术', '网络请求'],
    difficulty: '中等'
  },
  {
    id: 304,
    title: 'fetch 与 XMLHttpRequest 的区别',
    tags: ['Fetch', 'XMLHttpRequest', '比较'],
    difficulty: '中等'
  },
  {
    id: 305,
    title: '请求会发送2次的原因',
    tags: ['HTTP', 'OPTIONS', '预检请求'],
    difficulty: '中等'
  },
  {
    id: 306,
    title: 'websocket',
    tags: ['WebSocket', '实时通信', '网络协议'],
    difficulty: '中等'
  },
  {
    id: 307,
    title: 'WebSocket 建立连接的过程',
    tags: ['WebSocket', '握手过程', '网络协议'],
    difficulty: '中等'
  },
  {
    id: 308,
    title: 'Websocket 支持传输的数据类型',
    tags: ['WebSocket', '数据类型', '网络通信'],
    difficulty: '中等'
  },
  {
    id: 309,
    title: 'Server-Sent Events (SSE)',
    tags: ['SSE', '服务器推送', '网络通信'],
    difficulty: '中等'
  },
  {
    id: 310,
    title: 'Server-Sent Events (SSE) 使用场景',
    tags: ['SSE', '服务器推送', '应用场景'],
    difficulty: '中等'
  },
  {
    id: 311,
    title: 'SSE 与 websocket 区别',
    tags: ['SSE', 'WebSocket', '比较'],
    difficulty: '中等'
  },
  {
    id: 312,
    title: 'http2.0',
    tags: ['HTTP2', '网络协议', '性能优化'],
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

