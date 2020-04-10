import * as path from 'path'
import { findExistSync } from '@ftb/shared'
import { generateConfig } from './utils/generateConfig'
import { BaseConfig } from './utils/generateConfig'
import { Options } from './utils/options'

type WebpackConfig = BaseConfig & Options

export class Service {
  webpackConfig: WebpackConfig
  constructor() {
    this.webpackConfig = generateConfig()
  }

  webpackConfigRaw() {
    return this.webpackConfig
  }

  validEntry(): boolean {
    return findExistSync('', this.webpackConfig.entry)
  }

  getNodeModulesPath(...arg) {
    return path.join(__dirname, ...arg)
  }

  joinPath(p: string, ...arg) {
    return path.join(p, ...arg)
  }
}
