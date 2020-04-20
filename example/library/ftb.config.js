module.exports = {
  devServer: {
    port: 2021,
    open: true
  },
  packages: true,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config
        .output
          .filename('my-test.min.js')
          .library('MyTest')
          .libraryTarget('umd')
    }
  }
}