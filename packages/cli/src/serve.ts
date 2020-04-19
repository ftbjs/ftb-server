import * as path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import portfinder from 'portfinder'
import defaultsdeep from 'lodash.defaultsdeep'
import { logger, boxen } from '@ftb/shared'
import { dev } from './config/dev'

const serve = async service => {
  process.env.NODE_ENV = 'development'

  if (!service.validEntry()) {
    logger.red(`${logger.yellow.raw('Warning: ')}Couldn\'t find the entry file index.js in src directory.`)
    process.exit(0)
  }

  dev(service)

  // Ensure high priority for user-defined webpack configurations
  service.init()

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

  const devServerConfig = defaultsdeep({ devServer: service.webpackConfig.devServer }, { devServer: options })

  let webpackConfig = service.resolveWebpackConfig()

  webpackConfig = defaultsdeep({}, devServerConfig, webpackConfig)

  portfinder.basePort = (webpackConfig.devServer as any).port
  const autoPort = await portfinder.getPortPromise()
  if (autoPort) {
    ;(webpackConfig.devServer as any).port = autoPort
  } else {
    logger.red('Can not find an avaiable port, please check your local port.')
  }

  // const defaultDevConfig = defaultsdeep({ devServer: webpackConfig.devServer }, devConfig)
  const { port } = webpackConfig.devServer
  const rawHotUrl = `webpack-dev-server/client?http://localhost:${port}/`
  const entry = webpackConfig.entry.app

  if (typeof entry === 'string') {
    webpackConfig.entry.app = [rawHotUrl, entry]
  }

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig.devServer)

  const compiler = webpack(webpackConfig)
  const devServer = new WebpackDevServer(compiler, devServerConfig.devServer)

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
