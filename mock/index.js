const Mock = require('mockjs')
// param2Obj 用于处理地址栏中 URL 参数
const { param2Obj } = require('./utils')

// 导入 user : 拦截用户请求相关
const user = require('./user')
// 导入 table : 获取随机生成的表格数据
const table = require('./table')
// 导入role数据
const role = require('./role')
// 导入article：随机生成的文章数据
const article = require('./article')
const search = require('./remote-search')
// 展开 user 和 table 到 mocks 数组中：mocks=[{},{},{},...]
// 可以继续添加自定义的随机数据
const mocks = [...user, ...table, ...role, ...article, ...search]

// for front mock
// 请谨慎使用，它将重新定义 XMLHttpRequest
// 这将导致许多第三方库失效（如progress事件）
function mockXHR() {
  // mock patch
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      // 判断 respond 是否是 函数
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  // 遍历 mocks 数组数据
  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}

module.exports = {
  mocks,
  mockXHR
}
