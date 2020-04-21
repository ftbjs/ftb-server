import * as path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { findExistSync } from '@ftb/shared'

export function base(api) {
  const {
    webpackConfig: { entry, context, outputDir, template, packages },
    getNodeModulesPath
  } = api

  const entryName = 'app'
  const modulePath = getNodeModulesPath('../node_modules')
  const hasHtmlTemplate = findExistSync(context, template)

  api.chainWebpack(config => {
    config.context(context).entry(entryName).add(entry).end()

    config.module
      .rule('js')
      .test(/\.m?jsx?$/)
      .exclude.add(path.resolve(context, 'node_modules'))
      .end()
      .include.add(path.resolve(context, 'src'))
      .end()
      .use('babel-loader')
      .loader(require.resolve('babel-loader'))
      .options({
        cacheDirectory: true,
        babelrc: false,
        configFile: false,
        presets: [getNodeModulesPath('../node_modules/@babel/preset-env')],
        plugins: [
          [
            getNodeModulesPath('../node_modules/@babel/plugin-transform-runtime'),
            {
              corejs: false,
              useESModules: true
            }
          ],
          getNodeModulesPath('../node_modules/@babel/plugin-syntax-dynamic-import')
        ]
      })
      .end()

    config.module
      .rule('css')
      .test(/\.(sa|sc|c)ss$/)
      .use('style-loader')
      .loader(api.webpackConfig.mode === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader)
      .end()
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .end()
      .use('sass-loader')
      .loader(require.resolve('sass-loader'))
      .end()

    config.module
      .rule('image')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: 10000,
        name: path.resolve(api.webpackConfig.context, 'image/[name].[hash:7].[ext]')
      })

    config.module
      .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: 10000,
        name: path.resolve(api.webpackConfig.context, 'media/[name].[hash:7].[ext]')
      })

    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: 10000,
        name: path.resolve(api.webpackConfig.context, 'fonts/[name].[hash:7].[ext]')
      })

    config.resolve
      .set('symlinks', false)
      .extensions.merge(['.js', '.ts', '.json', '.scss'])
      .end()
      .modules.add('node_modules')
      .add(modulePath)
      .end()

    config.resolveLoader.modules.add('node_modules').add(modulePath).end()

    const htmlOptions = hasHtmlTemplate
      ? {
          template: path.resolve(context, template),
          filename: path.join(context, `/${outputDir}/index.html`),
          inject: true
        }
      : {
          filename: path.join(context, `/${outputDir}/index.html`),
          inject: true
        }

    if (!packages || (packages && process.env.NODE_ENV === 'development')) {
      config.plugin('html').use(HtmlWebpackPlugin, [htmlOptions])
    }
  })
}
