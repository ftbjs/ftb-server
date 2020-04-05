import Webpack from 'webpack'
import WebpackMerge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin = require('uglifyjs-webpack-plugin')
import OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import { base } from './base'

export function prod(api) {
  api.webpackConfig.mode = 'production'
  const { baseUrl, context, outputDir } = api.webpackConfig

  return WebpackMerge(base(api), {
    mode: 'production',
    output: {
      publicPath: baseUrl,
      path: api.getNodeModulesPath(context, outputDir),
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[id].[chunkhash].js'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            minSize: 1,
            priority: 0
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            cache: true,
            parallel: true,
            warnings: false,
            comments: false,
            compress: {
              /* eslint-disable @typescript-eslint/camelcase */

              drop_console: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new Webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    ]
  })
}
