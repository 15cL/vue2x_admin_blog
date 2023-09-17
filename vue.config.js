const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  assetsDir: 'static',
  transpileDependencies: true,
  configureWebpack: {
    externals: {
      // CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
      vue: 'Vue'
      // 属性名称 element-ui, 表示遇到 import xxx from 'element-ui' 这类引入 'element-ui'的，
      // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '小五博客管理'
      return args
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
