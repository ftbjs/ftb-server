import Webpack from 'webpack'
import WebpackMerge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin = require('uglifyjs-webpack-plugin')
import OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import { base } from './base'

export function prod(api) {
  api.webpackConfig.mode = 'production'
  const { publicPath, context, outputDir } = api.webpackConfig

  return WebpackMerge(base(api), {
    mode: 'production',
    output: {
      publicPath,
      path: api.joinPath(context, outputDir),
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[id].[contenthash:8].js'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
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
      new Webpack.HashedModuleIdsPlugin({
        hashDigest: 'hex'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    ]
  })
}
