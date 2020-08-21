const paths = require('./paths')

module.exports = {
  port: 8080,
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.styl'],
  alias:{
    '@': paths.src,
    '@img': paths.images,
    '@styles': paths.styles,
    '@components': paths.components,
    '@api': paths.api,
    '@utils': paths.utils,
    '@pages': paths.pages,
    '@interfaces': paths.interfaces,
  },
}