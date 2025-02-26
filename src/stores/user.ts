import { defineStore } from 'pinia'
import { login as userLogin, getUserInfo } from '@/api/user'
import type { LoginRequest } from '@/api/types'

interface UserInfo {
  name: string
  roles: string[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {
      name: '',
      roles: []
    } as UserInfo
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  
  actions: {
    async login(userInfo: LoginRequest) {
      try {
        // 清除旧token
        this.$reset()
        
        // 登录获取新token
        const { token } = await userLogin(userInfo)
        this.token = token
        localStorage.setItem('token', token)

        // 获取用户信息
        const userInfoData = await getUserInfo()
        this.userInfo.name = userInfoData.name
        this.userInfo.roles = userInfoData.roles

        return true
      } catch (error) {
        this.$reset()
        throw error
      }
    },
    
    async logout() {
      this.$reset()
      localStorage.removeItem('token')
    }
  },
  persist: {
    key: 'user',
    paths: ['token', 'userInfo']
  }
})

const isDev = import.meta.env.DEV 