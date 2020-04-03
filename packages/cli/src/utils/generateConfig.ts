import * as path from 'path'
import defaultsdeep from 'lodash.defaultsdeep'
import { findExistSync } from '@ftb/utils'

const cwd = process.cwd()

interface FtbDefault {
  baseUrl: string
  outputDir: string
  devServer: {
    open?: boolean
    port?: number
  }
}

const ftbDefault: FtbDefault = {
  baseUrl: '/',
  outputDir: 'dist',
  devServer: {
    open: false,
    port: 9687
  }
}

const baseConfig = {
  entry: `${cwd}/src/index.html`,
  context: cwd
}

export function generateConfig() {
  let config = {}
  if (findExistSync(baseConfig.context, 'ftb.config.js')) {
    config = require(path.resolve(baseConfig.context, 'ftb.config.js'))
  }
  return defaultsdeep(config, { ...ftbDefault, ...baseConfig })
}
