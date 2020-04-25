#!/usr/bin/env node

import commander from 'commander'
import { logger } from '@ftb/shared'
import serve from './serve'
import build from './build'
import { getVersion } from './utils/version'
import { Service } from './Service'
import { beforeStart } from './utils/beforesStart'

const service = new Service()
const ALLOW_ANALYZER = '--analyzer'

commander.version(getVersion(), '-v, --version').usage(logger.green.raw('<command> [Options]'))

commander
  .command('serve')
  .description(logger.green.raw('Start local server'))
  .action(async () => {
    await beforeStart(service)
    serve(service)
  })

commander
  .command('build <options>')
  .allowUnknownOption()
  .description(logger.green.raw('Build the project'))
  .action(async arg => {
    await beforeStart(service)
    if (ALLOW_ANALYZER === arg) {
      build(service, ALLOW_ANALYZER)
    }
    build(service, null)
  })

commander
  .command('*')
  .description(`Type a wrong command. Please try ${logger.green.raw('ftb-service -h')}`)
  .action(() => {
    logger.green('Please try `ftb-service -h`, Get the whole feature list.')
  })

commander.parse(process.argv)
