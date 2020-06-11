const merge = require('webpack-merge')
const webpack = require('webpack')
const BaseConfig = require('./webpack.config.base')
module.exports = merge(BaseConfig, {
  mode: 'development',
  devServer: {
    port: '3000',
    quiet: false,
    inline: true,
    stats: 'errors-only',
    overlay: false,
    clientLogLevel: 'silent',
    compress: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map'
})
