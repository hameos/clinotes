const path = require('path')
const conf = require('./clinotes.config')

const config = {
  entry: ['./src/index.tsx'],
  mode: 'production',
  module: {
    rules: [{ test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader' }],
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: `${conf.ip}:${conf.port}`,
  },

  resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },

  devtool: 'source-map',
}

module.exports = config
