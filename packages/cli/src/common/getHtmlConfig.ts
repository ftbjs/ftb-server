import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export function getHtmlConfig(api) {
  const {
    webpackConfig: { context, outputDir, template }
  } = api
  const htmlTemplate = {
    template: path.resolve(context, template)
  }
  return [
    new HtmlWebpackPlugin({
      ...htmlTemplate,
      filename: path.join(context, `/${outputDir}/index.html`),
      inject: true
    })
  ]
}
