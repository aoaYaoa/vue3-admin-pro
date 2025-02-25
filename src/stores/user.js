import { defineStore } from 'pinia'
import { login as loginApi, getUserInfo, logout as logoutApi } from '@/api/user.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    name: '',
    avatar: '',
    roles: [],
    routes: []
  }),
  
  actions: {
    async login(userInfo) {
      try {
        const { username, password } = userInfo
        const response = await loginApi({ username, password })
        
        if (response.code === 0) {
          this.token = response.token
          localStorage.setItem('token', response.token)
          
          await this.getUserInfo()
        } else {
          throw new Error(response.message || '登录失败')
        }
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    
    async getUserInfo() {
      try {
        const userInfo = await getUserInfo()
        const { roles, name, avatar } = userInfo
        
        if (!roles || roles.length <= 0) {
          throw new Error('获取用户信息失败: 角色为空')
        }
        
        this.roles = roles
        this.name = name
        this.avatar = avatar
        
        return userInfo
      } catch (error) {
        console.error(error)
        return false
      }
    },
    
    resetToken() {
      this.token = ''
      this.roles = []
      localStorage.removeItem('token')
    },
    
    async logout() {
      try {
        await logoutApi()
        this.resetToken()
        location.reload()
      } catch (error) {
        console.error(error)
      }
    }
  }
}) 