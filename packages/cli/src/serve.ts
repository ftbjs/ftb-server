import * as path from 'path'
import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import portfinder from 'portfinder'
import defaultsdeep from 'lodash.defaultsdeep'
import { logger, boxen } from '@ftb/shared'
import { dev } from './config/dev'

const serve = async service => {
  if (!service.validEntry()) {
    logger.red(`${logger.yellow.raw('Warning: ')}Couldn\'t find the entry file index.js in src directory.`)
    process.exit(0)
  }
  service.init()
  const devConfig = dev(service)

  // Support user change webpack config (WIP)
  console.log(service.resolveWebpackConfig())

  const options = {
    contentBase: [path.resolve(service.webpackConfig.context, 'dist')],
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true,
    watchContentBase: true,
    inline: true,
    liveReload: true,
    port: 2020,
    open: false
  }

  service.webpackConfig = defaultsdeep({ devServer: options }, service.webpackConfig)
  portfinder.basePort = (service.webpackConfig.devServer as any).port
  const autoPort = await portfinder.getPortPromise()
  if (autoPort) {
    ;(service.webpackConfig.devServer as any).port = autoPort
  } else {
    logger.red('Can not find an avaiable port, please check your local port.')
  }

  const defaultDevConfig = defaultsdeep({ devServer: service.webpackConfig.devServer }, devConfig)
  const { port } = defaultDevConfig.devServer
  const rawHotUrl = `webpack-dev-server/client?http://localhost:${port}/`
  const entry = defaultDevConfig.entry.app

  if (typeof entry === 'string') {
    defaultDevConfig.entry.app = [rawHotUrl, entry]
  }

  WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, options)

  const compiler = Webpack(defaultDevConfig)
  const devServer = new WebpackDevServer(compiler, options)

  devServer.listen(port, 'localhost', () => {
    const msg = []
    msg.push(logger.green.raw('App is running at:\n\n'))
    msg.push(`Local: ${logger.cyan.raw(`http://localhost:${port}\n\n`)}`)
    msg.push(logger.blackBright.raw('Copied local address to clipboard!\n\n'))
    msg.push(logger.blackBright.raw('You can also specify port and auto-open by ftb.config.js!'))
    console.log(boxen(msg.join(''), { padding: 1, borderColor: 'green' }))
  })
}

export default serve
