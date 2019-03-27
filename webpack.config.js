const path = require('path')
const webpack = require('webpack')

const config = {
  entry: [
    './src/index.js',
  ],
  mode: 'development',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
    ]
  },

  output: {
    path: path.resolve(__dirname + '/../', 'public'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: '127.0.0.1:80'
  },

  plugins: [
    new webpack.DefinePlugin({
      $CONFIG: JSON.stringify({
        ip:'127.0.0.1',
        port:'80'
      })
    }),
  ],

  devtool: 'source-map',

}

module.exports = config

