// https://webpack.docschina.org/guides/author-libraries
// https://webpack.docschina.org/configuration/output#output-librarytarget

type LibraryTarget =
  | 'var'
  | 'assign'
  | 'this'
  | 'window'
  | 'self'
  | 'global'
  | 'commonjs'
  | 'commonjs2'
  | 'commonjs-module'
  | 'amd'
  | 'amd-require'
  | 'umd'
  | 'umd2'
  | 'jsonp'
  | 'system'

interface Packages {
  filename: string
  library: string
  libraryTarget: LibraryTarget
}

export interface Options {
  publicPath: string
  outputDir: string
  indexPath: string
  assetsDir: string
  devServer: object
  platform: 'none' | 'react' | 'vue'
  chainWebpack?: Function
  packages?: Packages
  externals?: object | Array<any>
}

type Error = undefined | { _original: object; details: Array<any> }

export interface ValidateSchema {
  value: {} | Options
  error: Error
}

export interface BasePathConfig {
  entry: string
  template: string
  context: string
}
