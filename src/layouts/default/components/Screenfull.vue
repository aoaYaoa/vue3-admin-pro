<template>
  <el-tooltip effect="dark" content="全屏" placement="bottom">
    <el-icon class="screenfull" @click="toggle">
      <FullScreen />
    </el-icon>
  </el-tooltip>
</template>

<script lang="ts">
export default {
  name: 'Screenfull'
}
</script>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'

const toggle = () => {
  const element = document.documentElement
  if (!document.fullscreenElement) {
    element.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
  ElMessage.success('已切换全屏模式')
}
</script> 