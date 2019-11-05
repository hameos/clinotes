const path = require('path')

const config = {
  entry: ['./src/index.tsx'],
  mode: 'production',
  module: {
    rules: [{ test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader' }],
  },

  output: {
    path: path.resolve(__dirname, 'public'), //path.resolve(__dirname + '/../', 'public'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: '127.0.0.1:8080',
  },

  resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },

  devtool: 'source-map',
}

module.exports = config
