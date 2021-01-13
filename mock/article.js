const Mock = require('mockjs')

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      // 随机id
      id: '@increment()',
      // 随机标题：为 10-20 的句子
      title: '@ctitle(8, 15)',
      // 随机段落：50句
      paragraph: '@cparagraph(20)',
      content: '<h1>这是一条mock数据</h1>',
      // 随机状态：从后面数组中随机选一个
      'status|1': ['approval', 'unApproval', 'toBeApproval'],
      // 随机名字
      author: '@cname',
      // 随机时间
      display_time: '@datetime(yyyy年MM月dd日)',
      // 随机浏览量
      pageviews: '@integer(300, 5000)',
      // 随机类型：数组之一
      'type|1': ['JavaScript', 'JAVA', 'Python', 'C语言'],
      // 重要性：星数量1,2,3
      importance: '@integer(1, 3)'
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
    url: '/article/delete',
    type: 'post',
    response: data => {
      // data.query.id 为传入参数，字符串形式，通过 - 0,变为数字型
      const index = List.findIndex(item => item.id === data.query.id - 0)
      // 删除指定元素
      List.splice(index, 1)
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
