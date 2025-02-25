<template>
  <div class="topic-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>设计模式 题目</h2>
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

// 设计模式题目列表数据
const topicList = ref<Topic[]>([
  {
    id: 244,
    title: '设计模式是什么',
    tags: ['设计模式', '基础概念'],
    difficulty: '简单'
  },
  {
    id: 245,
    title: '设计模式的意义',
    tags: ['设计模式', '软件工程'],
    difficulty: '简单'
  },
  {
    id: 246,
    title: '什么是 MVC',
    tags: ['设计模式', 'MVC', '架构模式'],
    difficulty: '中等'
  },
  {
    id: 247,
    title: '什么是 MVVM',
    tags: ['设计模式', 'MVVM', '架构模式'],
    difficulty: '中等'
  },
  {
    id: 248,
    title: '有了 MVC 为什么要有 MVVM',
    tags: ['设计模式', 'MVC', 'MVVM', '架构演进'],
    difficulty: '中等'
  },
  {
    id: 249,
    title: '实现一个 MVVM 示例',
    tags: ['设计模式', 'MVVM', '实现'],
    difficulty: '困难'
  },
  {
    id: 250,
    title: '面向对象基本特性',
    tags: ['面向对象', 'OOP', '基础概念'],
    difficulty: '简单'
  },
  {
    id: 251,
    title: '面向对象的设计原则',
    tags: ['面向对象', '设计原则', 'SOLID'],
    difficulty: '中等'
  },
  {
    id: 252,
    title: '单例模式（Singleton Pattern）',
    tags: ['设计模式', '创建型模式', '单例'],
    difficulty: '中等'
  },
  {
    id: 253,
    title: '工厂模式（Factory Pattern）',
    tags: ['设计模式', '创建型模式', '工厂'],
    difficulty: '中等'
  },
  {
    id: 254,
    title: '建造者模式（Builder Pattern）',
    tags: ['设计模式', '创建型模式', '建造者'],
    difficulty: '中等'
  },
  {
    id: 255,
    title: '原型模式（Prototype Pattern）',
    tags: ['设计模式', '创建型模式', '原型'],
    difficulty: '中等'
  },
  {
    id: 256,
    title: '适配器模式（Adapter Pattern）',
    tags: ['设计模式', '结构型模式', '适配器'],
    difficulty: '中等'
  },
  {
    id: 257,
    title: '装饰者模式（Decorator Pattern）',
    tags: ['设计模式', '结构型模式', '装饰者'],
    difficulty: '中等'
  },
  {
    id: 258,
    title: '观察者模式（Observer Pattern）',
    tags: ['设计模式', '行为型模式', '观察者'],
    difficulty: '中等'
  },
  {
    id: 259,
    title: '策略模式（Strategy Pattern）',
    tags: ['设计模式', '行为型模式', '策略'],
    difficulty: '中等'
  },
  {
    id: 260,
    title: '命令模式（Command Pattern）',
    tags: ['设计模式', '行为型模式', '命令'],
    difficulty: '中等'
  },
  {
    id: 261,
    title: '状态模式（State Pattern）',
    tags: ['设计模式', '行为型模式', '状态'],
    difficulty: '中等'
  },
  {
    id: 262,
    title: '访问者模式（Visitor Pattern）',
    tags: ['设计模式', '行为型模式', '访问者'],
    difficulty: '困难'
  },
  {
    id: 263,
    title: '模板方法模式（Template Method Pattern）',
    tags: ['设计模式', '行为型模式', '模板方法'],
    difficulty: '中等'
  },
  {
    id: 264,
    title: '中介者模式（Mediator Pattern）',
    tags: ['设计模式', '行为型模式', '中介者'],
    difficulty: '中等'
  },
  {
    id: 265,
    title: '备忘录模式（Memento Pattern）',
    tags: ['设计模式', '行为型模式', '备忘录'],
    difficulty: '中等'
  },
  {
    id: 266,
    title: '解释器模式（Interpreter Pattern）',
    tags: ['设计模式', '行为型模式', '解释器'],
    difficulty: '困难'
  },
  {
    id: 267,
    title: '享元模式（Flyweight Pattern）',
    tags: ['设计模式', '结构型模式', '享元'],
    difficulty: '中等'
  },
  {
    id: 268,
    title: '责任链模式（Chain of Responsibility Pattern）',
    tags: ['设计模式', '行为型模式', '责任链'],
    difficulty: '中等'
  },
  {
    id: 269,
    title: '桥接模式（Bridge Pattern）',
    tags: ['设计模式', '结构型模式', '桥接'],
    difficulty: '中等'
  },
  {
    id: 270,
    title: '组合模式（Composite Pattern）',
    tags: ['设计模式', '结构型模式', '组合'],
    difficulty: '中等'
  },
  {
    id: 271,
    title: '迭代器模式（Iterator Pattern）',
    tags: ['设计模式', '行为型模式', '迭代器'],
    difficulty: '中等'
  },
  {
    id: 272,
    title: '代理模式（Proxy Pattern）',
    tags: ['设计模式', '结构型模式', '代理'],
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