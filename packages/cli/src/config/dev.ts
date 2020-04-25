import * as path from 'path'
import webpack from 'webpack'
import { base } from './base'

export function dev(api) {
  base(api)

  api.chainWebpack(config => {
    config.mode('development').devtool('inline-source-map').end()

    config.output
      .publicPath('/')
      .filename('[name].js')
      .path(path.resolve(api.webpackConfig.context, api.webpackConfig.outputDir))
      .end()

    // https://github.com/webpack/webpack/issues/6642
    config.output.globalObject(`(typeof self !== 'undefined' ? self : this)`)

    config.plugin('name-modules').use(webpack.NamedModulesPlugin)

    config.plugin('hot').use(webpack.HotModuleReplacementPlugin)
  })
}
