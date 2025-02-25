import request from '@/utils/request'
import type { LoginRequest, LoginResponse, UserInfo } from './types'

// 模拟登录接口
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // 直接返回模拟数据
  if (data.username === 'admin' && data.password === '123456') {
    return {
      token: 'admin-token'
    }
  }
  throw new Error('用户名或密码错误')
}

// 模拟获取用户信息接口
export const getUserInfo = async (): Promise<UserInfo> => {
  // 直接返回模拟数据
  return {
    roles: ['admin'],
    name: 'Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

// 模拟登出接口
export const logout = async () => {
  // 直接返回成功
  return { code: 0 }
} 