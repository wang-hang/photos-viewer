const CopyPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base')
const paths = require('./paths')

console.log(paths.cname)
const prodConfig = {
  mode: 'production',
  entry: paths.entry,
  output:{
    filename: '[name]-[contenthash].js'
  },
  stats: 'normal',
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: paths.cname, to: paths.outputDir}
      ]
    })
  ]
}
module.exports = merge(baseConfig, prodConfig)