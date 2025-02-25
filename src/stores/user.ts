import { defineStore } from 'pinia'
import router from '@/router'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const name = ref('')
  const avatar = ref('')
  const roles = ref<string[]>([])
  const routes = ref<any[]>([])
  const userInfo = ref({})
  
  // 判断用户是否已登录
  const isLoggedIn = computed(() => !!token.value)
  
  // 登录
  const login = async (loginForm: { username: string, password: string }) => {
    // 这里应该是实际的登录API调用
    // 为了示例，使用模拟数据
    return new Promise<void>((resolve, reject) => {
      // 模拟验证
      if (loginForm.username === 'admin' && loginForm.password === '123456') {
        const newToken = 'admin_token_' + Date.now()
        token.value = newToken
        localStorage.setItem('token', newToken)
        resolve()
      } else {
        reject(new Error('用户名或密码错误'))
      }
    })
  }
  
  // 获取用户信息
  const getUserInfo = async () => {
    // 模拟获取用户信息
    name.value = 'Admin'
    avatar.value = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    roles.value = ['admin']
    
    return {
      name: name.value,
      avatar: avatar.value,
      roles: roles.value
    }
  }
  
  // 重置Token
  const resetToken = () => {
    token.value = ''
    name.value = ''
    avatar.value = ''
    roles.value = []
    localStorage.removeItem('token')
  }
  
  // 登出
  const logout = async () => {
    resetToken()
    router.push('/login')
  }
  
  return {
    token,
    name,
    avatar,
    roles,
    routes,
    userInfo,
    isLoggedIn,
    login,
    getUserInfo,
    resetToken,
    logout
  }
})

const isDev = import.meta.env.DEV 