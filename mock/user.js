// 设置token
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
// 根据不同 Token 设置用户信息
const users = {
  'admin-token': {
    // 权限
    roles: ['admin'],
    // 介绍
    introduction: 'I am a super administrator',
    // 头像
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    // 角色
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // 用户登录请求
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      // config中包含用户登录请求参数
      // 将 username 解构出来
      const { username } = config.body
      // 根据登录的用户名 username 设置 token
      const token = tokens[username]
      // mock数据请求错误
      if (!token) {
        return {
          code: 60204,
          message: '用户名或密码不正确'
        }
      }
      // 用户登录请求成功，返回状态码和 token 值
      return {
        code: 20000,
        data: token
      }
    }
  },

  // 用户信息请求
  {
    url: '/user/info.*',
    type: 'get',
    response: config => {
      // 将请求参数中的 token 值解构出来
      const { token } = config.query
      // 通过mock中的 users 获取对应 token 的权限
      const info = users[token]

      // mock数据请求错误
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户信息'
        }
      }
      // 返回用户信息
      return {
        code: 20000,
        data: info
      }
    }
  },

  // 用户退出请求
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
