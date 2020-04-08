import Webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import * as path from 'path'
import { base } from './base'

export function dev(api) {
  api.webpackConfig.mode = 'development'
  return webpackMerge(base(api), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      publicPath: '/',
      path: path.resolve(api.webpackConfig.context, api.webpackConfig.outputDir),
      filename: '[name].js'
    },
    plugins: [new Webpack.NamedModulesPlugin(), new Webpack.HotModuleReplacementPlugin()]
  })
}
