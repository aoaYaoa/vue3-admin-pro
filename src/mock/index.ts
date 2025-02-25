import Mock from 'mockjs'

// 设置延迟时间
Mock.setup({
  timeout: '300-600'
})

// 用户认证相关接口
Mock.mock(/\/auth\/login/, 'post', (options) => {
  const { username, password } = JSON.parse(options.body)
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
})

Mock.mock(/\/auth\/info/, 'get', () => {
  return {
    code: 0,
    data: {
      roles: ['admin'],
      name: 'Admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  }
})

Mock.mock(/\/auth\/logout/, 'post', () => {
  return {
    code: 0,
    data: null
  }
})

// 系统管理相关接口
Mock.mock(/\/system\/users/, 'get', () => {
  return {
    code: 0,
    data: {
      list: Mock.mock({
        'list|10': [{
          id: '@id',
          username: '@name',
          roles: ['@pick(["admin", "editor"])'],
          status: '@pick(["active", "inactive"])'
        }]
      }).list,
      total: 10
    }
  }
})

Mock.mock(/\/system\/roles/, 'get', () => {
  return {
    code: 0,
    data: {
      list: Mock.mock({
        'list|5': [{
          id: '@id',
          name: '@word(4,8)',
          description: '@sentence(3,6)',
          permissions: ['@word(4,8)', '@word(4,8)', '@word(4,8)'],
          createTime: '@datetime'
        }]
      }).list,
      total: 5
    }
  }
})

export function setupMock() {
  // Mock 已经通过上面的配置自动设置好了
  console.log('Mock Initialized')
} 