const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv-webpack') //required dotenv webpack. makes dotenv available on frontend 

module.exports = {
  entry: './src/app.js',
  context: path.resolve(__dirname, 'frontend'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'frontend/dist')
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.woff2?$/, loader: 'file-loader' },
      { test: /\.(jpg|png|gif)$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    contentBase: 'src',
    hot: true,
    open: true,
    port: 8001,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new dotenv(), //added dotenv plugin 
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
