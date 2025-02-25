<template>
  <div class="code-block-wrapper">
    <div class="code-header">
      <span class="language-badge">{{ language }}</span>
      <el-button 
        v-if="copyEnabled" 
        class="copy-button" 
        size="small" 
        @click="copyCode"
        :icon="CopyDocument"
        circle
      />
    </div>
    <pre class="code-block" :class="`language-${language}`"><code ref="codeRef">{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: ''
  },
  copyEnabled: {
    type: Boolean,
    default: true
  }
})

const codeRef = ref<HTMLElement | null>(null)

// 复制代码功能
const copyCode = () => {
  if (!codeRef.value) return
  
  const text = codeRef.value.textContent || ''
  
  // 使用 navigator.clipboard API (现代浏览器)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => {
        ElMessage.success('代码已复制到剪贴板')
      })
      .catch(err => {
        console.error('复制失败:', err)
        fallbackCopy(text)
      })
  } else {
    fallbackCopy(text)
  }
}

// 传统的复制方法 (兼容旧浏览器)
const fallbackCopy = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  
  try {
    document.execCommand('copy')
    ElMessage.success('代码已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage.error('复制失败，请手动复制')
  }
  
  document.body.removeChild(textarea)
}
</script>

<style lang="scss" scoped>
.code-block-wrapper {
  margin: 15px 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d2d2d;
  padding: 8px 15px;
  color: #ffffff;
}

.language-badge {
  background-color: #409EFF;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  text-transform: uppercase;
}

.code-block {
  margin: 0;
  padding: 15px;
  background-color: #f8f8f8;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

// 语言特定样式
.language-html {
  background-color: #fffbf0;
}

.language-css {
  background-color: #f0f8ff;
}

.language-javascript {
  background-color: #fffcf0;
}
</style> 