import * as path from 'path'
import Config from 'webpack-chain'
import { findExistSync } from '@ftbjs/shared'
import { generateConfig } from './utils/generateConfig'
import { BasePathConfig, Options } from './interface'

type WebpackConfig = BasePathConfig & Options

export class Service {
  webpackConfig: WebpackConfig
  webpackChainFns: Array<any>
  constructor() {
    this.webpackConfig = generateConfig()
    this.webpackChainFns = []
  }

  init() {
    if (this.webpackConfig.chainWebpack) {
      this.webpackChainFns.push(this.webpackConfig.chainWebpack)
    }
  }

  chainWebpack(fn) {
    this.webpackChainFns.push(fn)
  }

  resolveChainableWebpackConfig() {
    // https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
    const chainableConfig = new Config()
    this.webpackChainFns.forEach(fn => fn(chainableConfig))
    return chainableConfig
  }

  resolveWebpackConfig() {
    return this.resolveChainableWebpackConfig().toConfig()
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
