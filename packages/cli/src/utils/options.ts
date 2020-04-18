import { createSchema, validate } from '@ftb/shared'

const schema = createSchema(joi =>
  joi.object({
    publicPath: joi.string().allow(''),
    outputDir: joi.string(),
    assetsDir: joi.string(),
    indexPath: joi.string(),
    devServer: joi.object(),
    platform: joi.string(),
    chainWebpack: joi.func(),
    packages: joi.object().allow('library', 'libraryTarget', 'filename'),
    externals: joi.object()
  })
)

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

interface ValidateSchema {
  value: {} | Options
  error: Error
}

export function validateSchema(options: Options): ValidateSchema {
  return validate(options, schema)
}

export function options(): Options {
  return {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: '',
    indexPath: 'index.html',
    devServer: {},
    platform: 'none'
  }
}
