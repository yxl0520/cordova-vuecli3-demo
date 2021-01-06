const path = require('path')
function resolve(dir) {
  //此处使用path.resolve 或path.join 可自行调整
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('com', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  pluginOptions: {
    cordovaPath: 'cordova'
  }
}
