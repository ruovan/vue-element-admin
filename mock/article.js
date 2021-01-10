const Mock = require('mockjs')

const List = []
const count = 50
// 基本内容信息
const baseContent =
  '<h1>这是一条mock数据</h1><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// 基本图片信息
const imageURL =
  'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      timestamp: '@datetime(yyyy年MM月dd)',
      author: '@cname',
      reviewer: '@cname',
      title: '@ctitle(10, 18)',
      content_short: 'mock data',
      content: baseContent,
      paragraph: '@cparagraph(50)',
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['JavaScript', 'JAVA', 'Python', 'C语言'],
      'status|1': ['approval', 'unApproval', 'toBeApproval'],
      display_time: '@datetime(yyyy-MM-dd)',
      comment_disabled: true,
      pageviews: '@integer(300, 5000)',
      imageURL,
      platforms: ['a-platform']
    })
  )
}

module.exports = [
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      // 解构
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 20,
        sort
      } = config.query
      // 过滤
      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/article.delete',
    type: 'post',
    response: data => {
      List.splice(
        List.findIndex(item => item.id === data),
        1
      )
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
