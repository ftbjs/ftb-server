import * as path from 'path'
import defaultsdeep from 'lodash.defaultsdeep'
import { findExistSync, logger } from '@ftb/shared'
import { validateSchema, options, Options } from './options'

export interface BaseConfig {
  entry: string
  template: string
  context: string
}

const cwd = process.cwd()

const baseConfig: BaseConfig = {
  entry: `${cwd}/src/index.js`,
  template: `${cwd}/public/index.html`,
  context: cwd
}

const defaultOptions = options()

const CustomConfiguration = (): Options => require(path.resolve(baseConfig.context, 'ftb.config.js'))

export function generateConfig() {
  if (findExistSync(baseConfig.context, 'ftb.config.js')) {
    const { value, error } = validateSchema(CustomConfiguration())

    if (error !== undefined) {
      logger.red('Got invalid config schema.')
      process.exit(0)
    }

    return defaultsdeep(value, { ...defaultOptions, ...baseConfig })
  }
  return defaultsdeep({ ...defaultOptions, ...baseConfig })
}
