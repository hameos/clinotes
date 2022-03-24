const devconfig = require('./webpack.config.js')

const config = {
  ...devconfig,
  mode: 'production',
  devtool: undefined,
}

module.exports = config
