export function getBabelConfig(api) {
  const { getNodeModulesPath } = api
  return {
    test: /\.m?jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
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
      }
    }
  }
}
