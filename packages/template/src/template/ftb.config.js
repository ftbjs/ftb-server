module.exports = {
  devServer: {
    port: 8080,
    open: true
  },
  packages: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config
        .output
        // You should rename the following variables
        .filename('index.min.js')
        .library('MyTest')
        .libraryTarget('umd')
    }
  }
}
