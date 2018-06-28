const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const VueloaderPlugin = require('vue-loader/lib/plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')

// 判断当前环境类别
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              // 输出文件的命名格式
              name: '[name]_[hash:6].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin(),
    new VueloaderPlugin()
  ]
}

// 开发环境
if (isDev) {
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    // 显示webpack编译过程中的错误
    overlay: {
      errors: true
    },
    // 热加载
    hot: true
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else { // 生产环境
  config.output.filename = '[name].[chunkhash:8].js'

  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssPlugin.loader,
        'css-loader'
      ]
    },
    {
      test: /\.styl$/,
      use: [
        MiniCssPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )

  config.plugins.push(
    new MiniCssPlugin({
      filename: 'style.[contenthash:8].css',
      chunkFilename: '[id].css'
    })
  )
}

module.exports = config