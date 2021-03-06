'use strict'

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const outputDir = process.env.npm_config_dir

module.exports = {
  publicPath: './',
  outputDir: outputDir ? outputDir : 'dist',
  lintOnSave: false,
  productionSourceMap:false,
  devServer:{
    port: 8081,
    proxy: {
      "/": {
        target: "http://172.18.174.1:8100/iocr-server/v1/",
        changOrigin: true,//允许跨域
      },
    }
  },
  configureWebpack: {
    optimization: {
      // 稳定module id
      moduleIds: 'hashed',
    },
  },
  chainWebpack(config) {
    config.resolve.symlinks(false)
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', (config) =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk({ name: 'runtime' })
    })
  },
}
