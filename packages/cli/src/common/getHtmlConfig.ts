import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export function getHtmlConfig(api) {
  const {
    webpackConfig: { context, outputDir, template, packages, mode }
  } = api
  const htmlTemplate = {
    template: path.resolve(context, template)
  }

  if (packages && mode === 'production') {
    return []
  }

  if (packages && mode === 'development') {
    return [
      new HtmlWebpackPlugin({
        filename: path.join(context, `/${outputDir}/index.html`),
        inject: true
      })
    ]
  }

  return [
    new HtmlWebpackPlugin({
      ...htmlTemplate,
      filename: path.join(context, `/${outputDir}/index.html`),
      inject: true
    })
  ]
}
