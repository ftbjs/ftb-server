import * as path from 'path'
import { findExistSync } from '@ftb/utils'
import { generateConfig } from './utils/generateConfig'

export class Service {
  webpackConfig: any
  constructor() {
    this.webpackConfig = generateConfig()
  }

  webpackConfigRaw() {
    return this.webpackConfig
  }

  validEntry(): boolean {
    return findExistSync('', this.webpackConfig.entry)
  }

  getNodeModulesPath(pos = __dirname, ...arg) {
    return path.join(pos, ...arg)
  }
}
