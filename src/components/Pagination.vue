<template>
  <div class="pagination-container">
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  total: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  }
})

const emit = defineEmits(['pagination'])

const handleSizeChange = (val: number) => {
  emit('pagination', { page: 1, limit: val })
}

const handleCurrentChange = (val: number) => {
  emit('pagination', { page: val })
}
</script> 