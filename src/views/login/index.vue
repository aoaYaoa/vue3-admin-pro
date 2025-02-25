<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <el-icon :size="60" class="logo-icon"><Monitor /></el-icon>
        <h1 class="system-name">Vue Admin Pro</h1>
      </div>
      
      <div class="login-form-container">
        <h3 class="login-title">系统登录</h3>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="用户名" 
              prefix-icon="User"
              size="large"
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password" 
              placeholder="密码" 
              :type="passwordVisible ? 'text' : 'password'"
              prefix-icon="Lock"
              size="large"
              :suffix-icon="passwordVisible ? 'View' : 'Hide'"
              @click-suffix-icon="passwordVisible = !passwordVisible"
            />
          </el-form-item>
          
          <el-button 
            :loading="loading" 
            type="primary" 
            class="login-button" 
            @click="handleLogin"
            size="large"
          >
            登录
          </el-button>
        </el-form>
        
        <div class="login-tips">
          <div class="tip-item">
            <span class="tip-label">用户名:</span>
            <span class="tip-value">admin</span>
          </div>
          <div class="tip-item">
            <span class="tip-label">密码:</span>
            <span class="tip-value">123456</span>
          </div>
        </div>
      </div>
      
      <div class="login-footer">
        <p>© 2023 Vue Admin Pro. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const passwordVisible = ref(false)

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const loginRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 调用store的登录方法
        await userStore.login(loginForm)
        
        // 添加这行：登录成功后跳转到首页
        router.push({ path: '/' })
        
        ElMessage.success('登录成功')
      } catch (error) {
        console.error('登录失败:', error)
        ElMessage.error('登录失败: ' + (error instanceof Error ? error.message : '未知错误'))
      } finally {
        loading.value = false
      }
    } else {
      return false
    }
  })
}

// 自动聚焦到用户名输入框
onMounted(() => {
  if (loginFormRef.value) {
    const inputEl = loginFormRef.value.$el.querySelector('input')
    inputEl?.focus()
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  position: relative;
}

.login-box {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-logo {
  text-align: center;
  margin-bottom: 30px;
  
  .logo-icon {
    color: #409eff;
    background-color: rgba(64, 158, 255, 0.1);
    padding: 15px;
    border-radius: 12px;
  }
  
  .system-name {
    margin-top: 15px;
    font-size: 24px;
    font-weight: 600;
    color: #409eff;
  }
}

.login-form-container {
  width: 100%;
  padding: 35px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 22px;
  color: #303133;
}

.login-form {
  margin-bottom: 25px;
  
  :deep(.el-input__wrapper) {
    border-radius: 4px;
    height: 50px;
  }
  
  :deep(.el-form-item__error) {
    padding-top: 4px;
  }
}

.login-button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
}

.login-tips {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f8f9fb;
  border-radius: 4px;
  border-left: 4px solid #409eff;
  
  .tip-item {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    
    .tip-label {
      color: #606266;
      font-weight: 500;
    }
    
    .tip-value {
      color: #409eff;
      font-weight: 500;
    }
  }
}

.login-footer {
  margin-top: 30px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .login-box {
    width: 90%;
  }
  
  .login-form-container {
    padding: 25px 20px;
  }
}
</style> 