<template>
  <div class="user-container">
    <el-card>
      <div class="table-header">
        <h3>用户管理</h3>
        <el-button type="primary" @click="handleAdd">添加用户</el-button>
      </div>
      
      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="roles" label="角色">
          <template #default="scope">
            <el-tag v-for="role in scope.row.roles" :key="role" class="mr-1">
              {{ role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page="currentPage"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface UserData {
  id: number
  username: string
  roles: string[]
  status: string
}

const tableData = ref<UserData[]>([])
const loading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 获取用户列表
const fetchUserList = async () => {
  loading.value = true
  try {
    // 模拟获取数据
    setTimeout(() => {
      tableData.value = [
        { id: 1, username: 'admin', roles: ['admin'], status: 'active' },
        { id: 2, username: 'editor', roles: ['editor'], status: 'active' },
        { id: 3, username: 'user1', roles: ['user'], status: 'inactive' },
        { id: 4, username: 'user2', roles: ['user'], status: 'active' }
      ]
      total.value = 4
      loading.value = false
    }, 500)
  } catch (error) {
    console.error('获取用户列表失败:', error)
    loading.value = false
  }
}

// 添加用户
const handleAdd = () => {
  ElMessage.success('点击了添加用户')
}

// 编辑用户
const handleEdit = (row: UserData) => {
  ElMessage.success(`编辑用户: ${row.username}`)
}

// 删除用户
const handleDelete = (row: UserData) => {
  ElMessageBox.confirm(`确认删除用户 ${row.username}?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success(`删除用户: ${row.username}`)
  }).catch(() => {
    // 取消删除
  })
}

// 处理分页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchUserList()
}

// 处理页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchUserList()
}

onMounted(() => {
  fetchUserList()
})
</script>

<style scoped>
.user-container {
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.mr-1 {
  margin-right: 5px;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}
</style> 