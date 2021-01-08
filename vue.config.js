'use strict'

// 如果您的端口设置为80，
// 使用管理员权限执行命令行。
// 例如:Mac: sudo npm run
// 可以通过以下方法修改端口:
// port = 9528 npm run dev OR npm run dev——port = 9528
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  /**
   * 如果计划部署网站的子路径，需要设置 publicPath
   * 例如GitHub页面。如果想要将站点部署到https://foo.github.io/bar/
   * 那么publicPath应该设置为/bar/
   * 在大多数情况下请使用 '/'
   * 具体请查看: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  // 编译目标目录
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    // 端口
    port: port,
    // 自动打开
    open: true,
    // 在浏览器中显示全屏覆盖层
    overlay: {
      // 当出现编译器警告时。不全屏显示
      warnings: false,
      // 当出现编译器错误时，全屏显示
      errors: true
    },
    // 使用 mock-server,在mock-server中拦截请求
    // before: require('./mock/mock-server.js'),
    // 设置API访问代理
    proxy: {
      // 改变接口 xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: 代理的服务器，也就是api要访问的服务器
        // 对 path 为 target 开头的 api 做代理转发
        target: `http://localhost:${port}/mock`,
        // changeOrigin: 将主机头的来源更改为目标URL，也就是是否允许跨域
        changeOrigin: true,
        // pathRewrite: 重写 url 的 path 部分，^是必需的？
        // path 是指 url中 端口号后面的部分
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  }
}
