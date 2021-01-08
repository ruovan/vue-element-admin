const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')

// process.cwd() 方法会返回 Node.js 进程的当前工作目录
// mockDir 即 mock的路径 /mock
const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  // 将模拟的数据 mocks 解构出来
  const { mocks } = require('./index.js')
  // 使用map方法遍历数组
  const mocksForServer = mocks.map(route => {
    // route 是数组中的每一个对象
    // 调用下面定义的 responseFake 方法，将对象中的 url,method,response 传入
    return responseFake(route.url, route.type, route.response)
  })
  // 遍历 mocksForServer
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  // Object.keys()方法 会返回一个由给定对象的自身可枚举属性组成的数组
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    // 判断是否包含 mock 路径
    if (i.includes(mockDir)) {
      // require.resolve() 查询对应路径
      delete require.cache[require.resolve(i)]
    }
  })
}

// mock-server
const responseFake = (url, type, respond) => {
  return {
    // url: 将url与基准地址拼接
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    // 设置请求方法，如果没有，默认为get
    type: type || 'get',
    // 响应数据
    response(req, res) {
      console.log('request invoke:' + req.path)
      // 响应数据转换为 JSON 格式
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      )
    }
  }
}

module.exports = app => {
  // parse app.body
  // app.use 匹配所有请求方式
  // 只解析json的中间件
  app.use(bodyParser.json())
  /*
    bodyParser.urlencoded这个方法对请求进行处理
    如果含有参数，就将参数转换为对象类型
    然后为req这个请求对象添加一个body属性，并把参数对象赋值给这个属性req.body
    最后在内部调用next()方法，进行下一个中间件的执行
  */
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          // clear routes cache
          unregisterRoutes()

          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex

          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`
            )
          )
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}
