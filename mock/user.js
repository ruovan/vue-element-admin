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
    // 角色
    name: 'admin',
    // 介绍
    introduction: '超级管理员:可以查看所有页面',
    // 头像
    avatar:
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
  },
  'editor-token': {
    roles: ['editor'],
    name: 'editor',
    introduction: '普通用户:可以查看除权限页以外的所有页',
    avatar:
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
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
      // 根据登录的用户名 username ,用模拟的数据设置 token
      const token = tokens[username]
      // 密码验证暂不处理

      // 如果没有token，表示用户名不对，mock数据请求错误
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
      // 将请求参数中的 token值 解构出来，token = admin-token | editor-token
      const { token } = config.query
      // 再根据 token 获取 users 用户信息：roles、introduction、name、avatar
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
