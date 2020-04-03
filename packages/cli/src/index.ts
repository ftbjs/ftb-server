#!/usr/bin/env node

import commander from 'commander'
import { logger } from '@ftb/utils'
import serve from './serve'
import build from './build'

commander.version('0.0.0', '-v, --version').usage(logger.green.raw('<command> [Options]'))

commander
  .command('serve')
  .description(logger.green.raw('Start local server'))
  .action(() => {
    serve()
  })

commander
  .command('build')
  .description(logger.green.raw('Build the project'))
  .action(() => {
    build()
  })

commander
  .command('*')
  .description(`Type a wrong command. Please try ${logger.green.raw('ftb-service -h')}`)
  .action(() => {
    logger.green('Please try `ftb-service -h`, Get the whole feature list.')
  })

commander.parse(process.argv)
