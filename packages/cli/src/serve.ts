import * as path from 'path'
import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import portfinder from 'portfinder'
import defaultsdeep from 'lodash.defaultsdeep'
import { logger } from '@ftb/shared'
import { Service } from './Service'
import { dev } from './config/dev'

const serve = async () => {
  const service = new Service()

  if (!service.validEntry()) {
    logger.red(`${logger.yellow.raw('Warning: ')}Couldn\'t find the entry file index.js in src directory.`)
    process.exit(0)
  }

  const devConfig = dev(service)

  const options = {
    contentBase: [path.resolve(service.webpackConfig.context, 'dist')],
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true,
    watchContentBase: true,
    inline: true,
    liveReload: true
  }

  service.webpackConfig = defaultsdeep({ devServer: options }, service.webpackConfig)
  portfinder.basePort = service.webpackConfig.devServer.port
  const autoPort = await portfinder.getPortPromise()
  if (autoPort) {
    service.webpackConfig.devServer.port = autoPort
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
    console.log(`Server is runing at ${logger.green.raw(`http://localhost:${port}`)}`)
  })
}

export default serve
