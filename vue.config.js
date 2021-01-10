'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 页面标题
const name = defaultSettings.title || 'vue Admin Template'

// 如果您的端口设置为80，
// 使用管理员权限执行命令行。
// 例如:Mac: sudo npm run
// 可以通过以下方法修改端口:
// port = 9528 npm run dev OR npm run dev——port = 9528
const port = process.env.port || process.env.npm_config_port || 9090 // dev port

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
  lintOnSave: process.env.NODE_ENV === 'development',
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
    // 添加一个before钩子函数,用来监听来自web的http请求
    before: require('./mock/mock-server.js')
    // 设置API访问代理
    // proxy: {
    //   // 改变接口 xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   [process.env.VUE_APP_BASE_API]: {
    //     // target: 代理的服务器，也就是api要访问的服务器
    //     // 对 path 为 target 开头的 api 做代理转发
    //     target: `http://localhost:${port}/mock`,
    //     // changeOrigin: 将主机头的来源更改为目标URL，也就是是否允许跨域
    //     changeOrigin: true,
    //     // pathRewrite: 重写 url 的 path 部分，^是必需的？
    //     // path 是指 url中 端口号后面的部分
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // },
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题，这样
    // 它可以在index.html中访问，以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack: config => {
    // 可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面太多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 产品上线阶段时
    // config.when(process.env.NODE_ENV !== 'development', config => {
    //   config
    //     .plugin('ScriptExtHtmlWebpackPlugin')
    //     .after('html')
    //     .use('script-ext-html-webpack-plugin', [
    //       {
    //         // `runtime` 必须与 runtimeChunk 相同. 默认是 `runtime`
    //         inline: /runtime\..*\.js$/
    //       }
    //     ])
    //     .end()
    //   config.optimization.splitChunks({
    //     chunks: 'all',
    //     cacheGroups: {
    //       libs: {
    //         name: 'chunk-libs',
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: 10,
    //         // 只打包最初依赖的第三方包
    //         chunks: 'initial'
    //       },
    //       elementUI: {
    //         // 将elementUI拆分为单个包
    //         name: 'chunk-elementUI',
    //         // the weight 需要大于libs和app，否则会被打包成libs或app
    //         priority: 20,
    //         // 为了适应cnpm
    //         test: /[\\/]node_modules[\\/]_?element-ui(.*)/
    //       },
    //       commons: {
    //         name: 'chunk-commons',
    //         // 可以自定义规则
    //         test: resolve('src/components'),
    //         //  最低常见的数量
    //         minChunks: 3,
    //         priority: 5,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   })
    //   config.optimization.runtimeChunk('single')
    // })
  }
}
