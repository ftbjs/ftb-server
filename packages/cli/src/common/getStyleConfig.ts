import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function getStyleConfig(api) {
  return {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: api.webpackConfig.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      }
    ]
  }
}
