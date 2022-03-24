const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')

dotenv.config()

const config = {
  entry: ['./src/index.tsx'],
  mode: 'development',
  module: {
    rules: [{ test: /\.(js|jsx|ts|tsx)$/, use: 'babel-loader' }],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: `/`,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.SERVER": JSON.stringify(process.env.SERVER)
    })
  ],
  resolve: { 
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    fallback: { 
      'fs': false,
      'os': false,
      'path': false
    },
  },
  devtool: 'source-map',
}

module.exports = config
