// 配置代理 - 用于联调
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {

  // 代理测试服务器
  app.use(createProxyMiddleware('/proxy', {
    target: 'https://blue.wechatsi.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': ''
    }
  }))

  // 代理一言组件
  app.use(createProxyMiddleware('/yiyan', {
    target: 'https://v1.hitokoto.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^/yiyan': ''
    }
  }))

}