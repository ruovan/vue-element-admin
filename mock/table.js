const Mock = require('mockjs')

// mock数据
const data = Mock.mock({
  // 30个数组
  'items|30': [
    {
      // 随机id
      id: '@id',
      // 随机标题：为 10-20 的句子
      title: '@ctitle(10, 20)',
      // 随机状态：从后面数组中随机选一个
      'status|1': ['published', 'draft', 'deleted'],
      // 随机名字
      author: '@cname',
      // 随机时间
      display_time: '@datetime(yyyy年MM月dd日)',
      // 随机
      pageviews: '@integer(300, 5000)'
    }
  ]
})

module.exports = [
  // 拦截请求，获取表格数据
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      // 将随机生成的数据返回
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
