import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export function getHtmlConfig(api) {
  const {
    webpackConfig: { cwd, outputDir, template }
  } = api
  const htmlTemplate = {
    template: path.resolve(cwd, template)
  }
  return [
    new HtmlWebpackPlugin({
      ...htmlTemplate,
      filename: path.join(cwd, `/${outputDir}/index.html`),
      inject: true
    })
  ]
}
