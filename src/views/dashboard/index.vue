<template>
  <div class="dashboard-container">
    <div class="dashboard-wrapper">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper">
              <el-icon class="card-panel-icon"><Document /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-title">题目总数</div>
              <div class="card-panel-num">{{ cardData.totalCount || 0 }}</div>
            </div>
          </div>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper category">
              <el-icon class="card-panel-icon"><Folder /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-title">分类数量</div>
              <div class="card-panel-num">{{ cardData.categoryCount || 0 }}</div>
            </div>
          </div>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper user">
              <el-icon class="card-panel-icon"><User /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-title">当前在线</div>
              <div class="card-panel-num">{{ cardData.onlineCount || 0 }}</div>
            </div>
          </div>
        </el-col>
        
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper system">
              <el-icon class="card-panel-icon"><Cpu /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-title">系统负载</div>
              <div class="card-panel-num">{{ cardData.systemLoad || 0 }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
      
      <div class="dashboard-intro">
        <h2 class="welcome-title">欢迎使用 Vue Admin Pro</h2>
        <p class="welcome-desc">基于 Vue 3, TypeScript, Vite 和 Element Plus 的管理系统模板</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CardData {
  totalCount: number
  categoryCount: number
  onlineCount: number
  systemLoad: number
}

const cardData = ref<CardData>({
  totalCount: 34,
  categoryCount: 16,
  onlineCount: 1,
  systemLoad: 28
})

// 组件挂载时可以获取实时数据
onMounted(() => {
  // 这里可以加载实际数据
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.dashboard-wrapper {
  width: 100%;
}

/* 强制el-row不要超出父容器 */
:deep(.el-row) {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.card-panel-col {
  margin-bottom: 20px;
}

.card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border-color: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    
    .card-panel-icon-wrapper {
      color: #fff;
      background: #409EFF;
      
      &.category {
        background: #67C23A;
      }
      
      &.user {
        background: #E6A23C;
      }
      
      &.system {
        background: #F56C6C;
      }
    }
  }
}

.card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 8px;
  background: rgba(64, 158, 255, 0.1);
  color: #409EFF;
  
  &.category {
    background: rgba(103, 194, 58, 0.1);
    color: #67C23A;
  }
  
  &.user {
    background: rgba(230, 162, 60, 0.1);
    color: #E6A23C;
  }
  
  &.system {
    background: rgba(245, 108, 108, 0.1);
    color: #F56C6C;
  }
}

.card-panel-icon {
  font-size: 28px;
}

.card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px 0 0 0;
  padding-right: 16px;
  text-align: right;
}

.card-panel-title {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  margin-bottom: 12px;
}

.card-panel-num {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.dashboard-intro {
  margin-top: 30px;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  
  .welcome-title {
    color: #409EFF;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  
  .welcome-desc {
    color: #606266;
    font-size: 16px;
  }
}
</style> 