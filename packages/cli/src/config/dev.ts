import * as path from 'path'
import webpack from 'webpack'
import { base } from './base'

export function dev(api) {
  api.webpackConfig.mode = 'development'

  base(api)

  api.chainWebpack(config => {
    config.mode('development').devtool('inline-source-map').end()

    config.output
      .publicPath('/')
      .filename('[name].js')
      .path(path.resolve(api.webpackConfig.context, api.webpackConfig.outputDir))
      .end()

    config.output.globalObject('this')

    config.plugin('name-modules').use(webpack.NamedModulesPlugin)

    config.plugin('hot').use(webpack.HotModuleReplacementPlugin)
  })
}
