import * as path from 'path'
import { findExistSync } from '@ftb/shared'
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

  getNodeModulesPath(...arg) {
    return path.join(__dirname, ...arg)
  }

  joinPath(p: string, ...arg) {
    return path.join(p, ...arg)
  }
}
