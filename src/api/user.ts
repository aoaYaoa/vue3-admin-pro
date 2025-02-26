import request from '@/utils/request'
import type { LoginRequest, LoginResponse, UserInfo } from './types'

// 模拟登录接口
export const login = (data: LoginRequest) => {
  return request<LoginResponse>({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 模拟获取用户信息接口
export const getUserInfo = () => {
  return request<UserInfo>({
    url: '/api/user/info',
    method: 'get'
  })
}

// 模拟登出接口
export const logout = () => {
  return request({
    url: '/api/logout',
    method: 'post'
  })
} 