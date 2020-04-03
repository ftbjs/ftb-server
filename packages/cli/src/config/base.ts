export function base(api) {
  const {
    webpackConfig: { entry },
    getNodeModulesPath
  } = api
  // Notice the path problem
  const modulePath = getNodeModulesPath('../node_modules')
  return {
    entry: {
      app: entry
    },
    module: {
      rules: []
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'],
      modules: ['node_modules', modulePath],
      symlinks: false
    },
    resolveLoader: {
      modules: ['node_modules', modulePath]
    },
    plugins: []
  }
}
