import { createSchema, validate } from '@ftb/shared'

const schema = createSchema(joi =>
  joi.object({
    publicPath: joi.string().allow(''),
    outputDir: joi.string(),
    assetsDir: joi.string(),
    indexPath: joi.string(),
    devServer: joi.object(),
    platform: joi.string(),
    chainWebpack: joi.func()
  })
)

export interface Options {
  publicPath: string
  outputDir: string
  indexPath: string
  assetsDir: string
  devServer: object
  platform: 'none' | 'react' | 'vue'
  chainWebpack?: Function
}

interface ValidateSchema {
  value: {} | Options
  error: undefined | Error
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
