import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { base } from './base'

export function prod(api) {
  const { publicPath, context, outputDir } = api.webpackConfig

  base(api)

  api.chainWebpack(config => {
    config
      .mode('production')
      .output.publicPath(publicPath)
      .path(api.joinPath(context, outputDir))
      .filename('js/[name].[contenthash:8].js')
      .chunkFilename('js/[name].[id].[contenthash:8].js')
      .end()

    config.optimization
      .minimizer('css')
      .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])
      .use(UglifyJsPlugin, [
        {
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
        }
      ])

    config.optimization.splitChunks({
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
    })

    config.plugin('named-chunks').use(require('webpack/lib/NamedChunksPlugin'), [
      chunk => {
        if (chunk.name) {
          return chunk.name
        }
        return (
          'chunk-' +
          Array.from(chunk.modulesIterable, m => {
            return (m as any).id
          }).join('_')
        )
      }
    ])

    config.plugin('hash-module-ids').use(require('webpack/lib/HashedModuleIdsPlugin'), [
      {
        hashDigest: 'hex'
      }
    ])

    const MiniCssExtractPluginConfig = config.toConfig().output.library
      ? {
          filename: `${config.toConfig().output.filename}.min.css`
        }
      : {
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
        }

    config.plugin('min-css').use(MiniCssExtractPlugin, [MiniCssExtractPluginConfig])
  })
}
