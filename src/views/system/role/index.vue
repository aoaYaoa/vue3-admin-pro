<template>
  <div class="role-container">
    <el-card>
      <div class="table-header">
        <h3>角色管理</h3>
        <el-button type="primary" @click="handleAdd">添加角色</el-button>
      </div>
      
      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" width="150" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="success" @click="handlePermission(scope.row)">权限</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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

interface RoleData {
  id: number
  name: string
  description: string
  createTime: string
}

const tableData = ref<RoleData[]>([])
const loading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 获取角色列表
const fetchRoleList = async () => {
  loading.value = true
  try {
    // 模拟获取数据
    setTimeout(() => {
      tableData.value = [
        { 
          id: 1, 
          name: 'admin', 
          description: '管理员，拥有所有权限', 
          createTime: '2023-01-01 12:00:00' 
        },
        { 
          id: 2, 
          name: 'editor', 
          description: '编辑者，拥有内容管理权限', 
          createTime: '2023-01-02 10:30:00' 
        },
        { 
          id: 3, 
          name: 'user', 
          description: '普通用户，仅有查看权限', 
          createTime: '2023-01-03 14:15:00' 
        }
      ]
      total.value = 3
      loading.value = false
    }, 500)
  } catch (error) {
    console.error('获取角色列表失败:', error)
    loading.value = false
  }
}

// 添加角色
const handleAdd = () => {
  ElMessage.success('点击了添加角色')
}

// 编辑角色
const handleEdit = (row: RoleData) => {
  ElMessage.success(`编辑角色: ${row.name}`)
}

// 设置权限
const handlePermission = (row: RoleData) => {
  ElMessage.success(`设置角色权限: ${row.name}`)
}

// 删除角色
const handleDelete = (row: RoleData) => {
  ElMessageBox.confirm(`确认删除角色 ${row.name}?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success(`删除角色: ${row.name}`)
  }).catch(() => {
    // 取消删除
  })
}

// 处理分页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchRoleList()
}

// 处理页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchRoleList()
}

onMounted(() => {
  fetchRoleList()
})
</script>

<style scoped>
.role-container {
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

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}
</style> 