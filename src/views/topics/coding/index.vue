<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>代码编程 题目</h2>
          <el-input
            v-model="searchText"
            placeholder="搜索题目..."
            prefix-icon="Search"
            clearable
            style="width: 300px"
          />
        </div>
      </template>
      
      <!-- 功能程序题部分 -->
      <div class="category-header">
        <h3>-- 功能程序题 --</h3>
      </div>
      
      <el-table
        :data="functionalTopics"
        style="width: 100%; margin-bottom: 30px"
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
      
      <!-- 算法题部分 -->
      <div class="category-header">
        <h3>-- 算法题 --</h3>
      </div>
      
      <el-table
        :data="algorithmTopics"
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
function example(arr) {
  // 功能函数示例
  return arr.reduce((a, b) => a + b, 0);
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

// 保留图标引用
const searchIcon = Search

interface Topic {
  id: number
  title: string
  description: string
  answer: string
  tags: string[]
  difficulty: string
  category?: string  // 允许分类属性
  code?: string
}

// 题目列表
const topicList = ref<Topic[]>([
  {
    id: 121,
    title: '多维数组降为一维（数组扁平化）',
    description: '多维数组降为一维（数组扁平化）',
    answer: '多维数组降为一维（数组扁平化）',
    tags: ['数组', '递归', '扁平化'],
    difficulty: '中等'
  },
  {
    id: 122,
    title: '找到页面所有 a标签的 href 属性',
    description: '找到页面所有 a标签的 href 属性',
    answer: '找到页面所有 a标签的 href 属性',
    tags: ['DOM', '操作', '选择器'],
    difficulty: '简单'
  },
  {
    id: 123,
    title: '如何给按钮绑定两个事件',
    description: '如何给按钮绑定两个事件',
    answer: '如何给按钮绑定两个事件',
    tags: ['DOM', '事件'],
    difficulty: '简单'
  },
  {
    id: 124,
    title: '实现拖拉拽功能',
    description: '实现拖拉拽功能',
    answer: '实现拖拉拽功能',
    tags: ['拖拽', '交互', 'DOM'],
    difficulty: '中等'
  },
  {
    id: 125,
    title: '原地打乱数组（数组洗牌）',
    description: '原地打乱数组（数组洗牌）',
    answer: '原地打乱数组（数组洗牌）',
    tags: ['数组', '随机', '算法'],
    difficulty: '中等'
  },
  {
    id: 126,
    title: '不能用 Array.sort 方法如何实现排序',
    description: '不能用 Array.sort 方法如何实现排序',
    answer: '不能用 Array.sort 方法如何实现排序',
    tags: ['排序', '算法', '数组'],
    difficulty: '中等'
  },
  {
    id: 127,
    title: '对象深拷贝',
    description: '对象深拷贝',
    answer: '对象深拷贝',
    tags: ['对象', '深拷贝', '递归'],
    difficulty: '中等'
  },
  {
    id: 128,
    title: '实现一个柯里化函数 add',
    description: '实现一个柯里化函数 add',
    answer: '实现一个柯里化函数 add',
    tags: ['函数式编程', '柯里化'],
    difficulty: '中等'
  },
  {
    id: 129,
    title: '字符串 "abcde" 如何反转',
    description: '字符串 "abcde" 如何反转',
    answer: '字符串 "abcde" 如何反转',
    tags: ['字符串', '反转'],
    difficulty: '简单'
  },
  {
    id: 130,
    title: '实现一个防抖函数',
    description: '实现一个防抖函数',
    answer: '实现一个防抖函数',
    tags: ['防抖', '性能优化', '函数'],
    difficulty: '中等'
  },
  {
    id: 131,
    title: '实现一个截流函数',
    description: '实现一个截流函数',
    answer: '实现一个截流函数',
    tags: ['截流', '性能优化', '函数'],
    difficulty: '中等'
  },
  {
    id: 132,
    title: '实现一个方法，能上传图片并预览',
    description: '实现一个方法，能上传图片并预览',
    answer: '实现一个方法，能上传图片并预览',
    tags: ['文件', '上传', 'DOM'],
    difficulty: '中等'
  },
  {
    id: 133,
    title: '获取当前日期（年-月-日）',
    description: '获取当前日期（年-月-日）',
    answer: '获取当前日期（年-月-日）',
    tags: ['日期', '格式化'],
    difficulty: '简单'
  },
  {
    id: 134,
    title: '实现一个 once 函数，保证函数只执行一次',
    description: '实现一个 once 函数，保证函数只执行一次',
    answer: '实现一个 once 函数，保证函数只执行一次',
    tags: ['函数', '闭包'],
    difficulty: '中等'
  },
  {
    id: 135,
    title: '实现一个私有变量，用 get 和 set 访问',
    description: '实现一个私有变量，用 get 和 set 访问',
    answer: '实现一个私有变量，用 get 和 set 访问',
    tags: ['封装', '私有变量'],
    difficulty: '中等'
  },
  {
    id: 136,
    title: '将原生的 ajax 封装成 promise',
    description: '将原生的 ajax 封装成 promise',
    answer: '将原生的 ajax 封装成 promise',
    tags: ['Ajax', 'Promise', '封装'],
    difficulty: '中等'
  },
  {
    id: 137,
    title: '实现 sleep 效果',
    description: '实现 sleep 效果',
    answer: '实现 sleep 效果',
    tags: ['异步', '定时器'],
    difficulty: '简单'
  },
  {
    id: 138,
    title: '实现下载图片功能',
    description: '实现下载图片功能',
    answer: '实现下载图片功能',
    tags: ['下载', 'Blob', 'URL'],
    difficulty: '中等'
  },
  {
    id: 139,
    title: '实现前端添加水印',
    description: '实现前端添加水印',
    answer: '实现前端添加水印',
    tags: ['水印', 'Canvas', 'DOM'],
    difficulty: '中等'
  },
  {
    id: 140,
    title: '实现响应式数据 + 依赖收集',
    description: '实现响应式数据 + 依赖收集',
    answer: '实现响应式数据 + 依赖收集',
    tags: ['响应式', 'Vue原理', '观察者模式'],
    difficulty: '困难'
  },
  {
    id: 141,
    title: '手动实现一个 instanceof 方法',
    description: '手动实现一个 instanceof 方法',
    answer: '手动实现一个 instanceof 方法',
    tags: ['原型链', '运算符实现'],
    difficulty: '中等'
  },
  {
    id: 142,
    title: '还原一棵树',
    description: '还原一棵树',
    answer: '还原一棵树',
    tags: ['树', '数据结构', '递归'],
    difficulty: '中等'
  },
  {
    id: 143,
    title: '实现 b 函数，使得 b.this === window',
    description: '实现 b 函数，使得 b.this === window',
    answer: '实现 b 函数，使得 b.this === window',
    tags: ['this', '上下文', '函数'],
    difficulty: '中等'
  },
  {
    id: 144,
    title: '实现一个 set 方法，支持 a.b.c = value',
    description: '实现一个 set 方法，支持 a.b.c = value',
    answer: '实现一个 set 方法，支持 a.b.c = value',
    tags: ['对象', '属性访问', '链式操作'],
    difficulty: '中等'
  },
  {
    id: 145,
    title: '并发请求控制，实现同时最多10个请求',
    description: '并发请求控制，实现同时最多10个请求',
    answer: '并发请求控制，实现同时最多10个请求',
    tags: ['请求控制', '异步', '队列'],
    difficulty: '困难'
  },
  {
    id: 146,
    title: '一只青蛙一次可以跳上1级台阶，也可以跳上2级，求跳上 n 级有多少种跳法',
    description: '一只青蛙一次可以跳上1级台阶，也可以跳上2级，求跳上 n 级有多少种跳法',
    answer: '一只青蛙一次可以跳上1级台阶，也可以跳上2级，求跳上 n 级有多少种跳法',
    tags: ['算法', '动态规划', '斐波那契'],
    difficulty: '中等',
    category: '算法题'
  },
  {
    id: 147,
    title: '找出字符串中不含有重复字符的最长子串长度',
    description: '找出字符串中不含有重复字符的最长子串长度',
    answer: '找出字符串中不含有重复字符的最长子串长度',
    tags: ['算法', '字符串', '滑动窗口'],
    difficulty: '中等',
    category: '算法题'
  },
  {
    id: 148,
    title: '给定一个字符串，判断是否是回文',
    description: '给定一个字符串，判断是否是回文',
    answer: '给定一个字符串，判断是否是回文',
    tags: ['算法', '字符串', '双指针'],
    difficulty: '简单',
    category: '算法题'
  },
  {
    id: 149,
    title: '反转一个链表',
    description: '反转一个链表',
    answer: '反转一个链表',
    tags: ['算法', '链表', '指针操作'],
    difficulty: '中等',
    category: '算法题'
  },
  {
    id: 150,
    title: '二叉树的遍历',
    description: '二叉树的遍历',
    answer: '二叉树的遍历',
    tags: ['算法', '二叉树', '遍历'],
    difficulty: '中等',
    category: '算法题'
  },
  {
    id: 151,
    title: '实现一个全排列',
    description: '实现一个全排列',
    answer: '实现一个全排列',
    tags: ['算法', '排列', '递归'],
    difficulty: '中等',
    category: '算法题'
  },
  {
    id: 152,
    title: '快速找到链表的中间节点',
    description: '快速找到链表的中间节点',
    answer: '快速找到链表的中间节点',
    tags: ['算法', '链表', '双指针'],
    difficulty: '中等',
    category: '算法题'
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

// 确保在代码中使用 filteredTopics
console.log('Filtered topics:', filteredTopics.value.length)

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

// 按分类过滤题目
const functionalTopics = computed(() => {
  if (!searchText.value) {
    return topicList.value.filter(topic => !topic.category || topic.category !== '算法题')
  }
  
  const keyword = searchText.value.toLowerCase()
  return topicList.value.filter(
    topic => 
      (!topic.category || topic.category !== '算法题') &&
      (topic.title.toLowerCase().includes(keyword) || 
       topic.tags.some(tag => tag.toLowerCase().includes(keyword)))
  )
})

const algorithmTopics = computed(() => {
  if (!searchText.value) {
    return topicList.value.filter(topic => topic.category === '算法题')
  }
  
  const keyword = searchText.value.toLowerCase()
  return topicList.value.filter(
    topic => 
      topic.category === '算法题' &&
      (topic.title.toLowerCase().includes(keyword) || 
       topic.tags.some(tag => tag.toLowerCase().includes(keyword)))
  )
})
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

.category-header {
  margin: 10px 0 20px;
  text-align: center;
}

.category-header h3 {
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  margin: 0;
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
