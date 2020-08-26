const path = require('path')
const config = require('./config')

const resolve = (value) => path.resolve(__dirname, '../', value)

module.exports = {
  entry: resolve('src/index.tsx'),
  src: resolve('src'),
  templateHtml: resolve('index.html'),
  outputHtml: resolve('dist', 'index.html'),
  styles: resolve('src/css'),
  images: resolve('src/img'),
  utils: resolve('src/utils'),
  api: resolve('src/api'),
  components: resolve('src/components'),
  interfaces: resolve('src/interfaces'),
  pages: resolve('src/pages'),
  outputDir: resolve('docs'),
  publicPath: resolve('/photos-viewer'),
  outputFileName: '[name][hash:6].js',
}