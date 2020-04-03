import { logger } from '@ftb/utils'
import { Service } from './service'
import { dev } from './config/dev'

const serve = () => {
  const service = new Service()

  if (service.validEntry()) {
    logger.red(`${logger.yellow.raw('Warning: ')}Couldn\'t find the entry file index.js in src directory.`)
    process.exit(0)
  }

  const devConfig = dev(service)

  // console.log(service.validEntry())
  // console.log(service.webpackConfigRaw())
  console.log(devConfig)
}

export default serve
