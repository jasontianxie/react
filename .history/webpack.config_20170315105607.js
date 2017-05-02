const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const casProxy = require('./proxy');

module.exports = {
  entry: {
    js: './app/client.js',
    vendor: [
      'react', 'classnames', 'react-router', 'react-dom',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './vendor.js',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      components: __dirname + '/app/components',
      actions: __dirname + '/app/actions',
      api: __dirname + '/app/api',
      reducers: __dirname + '/app/reducers',
      utils: __dirname + '/app/utils',
      constants: __dirname + '/app/constants',
      controllers: __dirname + '/app/controllers',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      }, {
        test: /\.less$/,
        loader: 'style!css!postcss!less',
      }, {
        test: /\.css/,
        loader: 'style!css',
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      }, 
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    /*压缩优化代码开始  可以关掉*/
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    /*压缩优化代码结束*/
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './app/',//devserver的主文件夹
    historyApiFallback: true,//如果使用了html5的history API，那么设置historyApiFallback为true，当你访问的一个页面是404的时候，将不会返回404.而是会返回index.html。这样使交互更加友好。
    hot: true,//打开热替换，HMR，hot module replacement。
    proxy: casProxy(),
    host: '0.0.0.0'
  },
}
