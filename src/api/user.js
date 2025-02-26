import request from '@/utils/request'

// 登录接口
export function login(data) {
  // 简单实现，模拟登录请求
  // 如果是实际项目，应该使用 request 发送真实请求
  return new Promise((resolve) => {
    // 模拟成功响应
    if (data.username === 'admin' && data.password === '123456') {
      resolve({
        code: 0,
        token: 'admin-token'
      })
    } else {
      // 模拟失败响应
      resolve({
        code: 1,
        message: '用户名或密码错误'
      })
    }
  })
}

// 获取用户信息接口
export function getUserInfo() {
  // 模拟获取用户信息
  return new Promise((resolve) => {
    resolve({
      roles: ['admin'],
      name: 'Admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    })
  })
}

// 退出登录接口
export function logout() {
  // 模拟退出登录
  return new Promise((resolve) => {
    resolve({
      code: 0,
      data: 'success'
    })
  })
} 