module.exports = {
  devServer: {
    port: 2021,
    open: true
  },
  packages: true,
  chainWebpack: (config) => {
    config.devServer
      .open(true)
      .port(9999)
      .end()
    if (process.env.NODE_ENV === 'production') {
      config
        .output
          .filename('my-test.min.js')
          .library('MyTest')
          .libraryTarget('umd')
    }
  }
}