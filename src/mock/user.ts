import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/auth/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return {
          code: 0,
          data: {
            token: 'admin-token'
          }
        }
      }
      return {
        code: 1,
        message: '用户名或密码错误'
      }
    }
  },
  {
    url: '/auth/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          roles: ['admin'],
          name: 'Admin',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
      }
    }
  }
] as MockMethod[] 