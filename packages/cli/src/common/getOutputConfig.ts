export function getOutputConfig(api) {
  const { packages } = api.webpackConfig
  if (packages) {
    return {
      filename: `${packages.filename}.min.js`,
      library: packages.library,
      libraryTarget: packages.libraryTarget
    }
  }
  return {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[id].[contenthash:8].js'
  }
}
