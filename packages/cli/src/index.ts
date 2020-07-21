#!/usr/bin/env node

import commander from 'commander'
import { logger } from '@ftbjs/shared'
import { createLibrary } from '@ftbjs/template'
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
  .description(logger.green.raw('start a local server.'))
  .action(async () => {
    await beforeStart(service)
    await serve(service)
  })

commander
  .command('build [options]')
  .allowUnknownOption()
  .description(logger.green.raw('build project.'))
  .action(async arg => {
    await beforeStart(service)
    if (ALLOW_ANALYZER === arg) {
      build(service, ALLOW_ANALYZER)
    }
    build(service, null)
  })

commander
  .command('create <app-name>')
  .option('-f', 'remove old directory')
  .description(logger.green.raw('Create package template using cli.'))
  .action(async (arg, options) => {
    await createLibrary({ appName: arg, cmd: options.parent.args })
  })

commander
  .command('*')
  .description(`type a wrong command. Please try ${logger.green.raw('ftbjs -h')}`)
  .action(() => {
    logger.green('please try `ftbjs -h`, get the whole feature list.')
  })

commander.parse(process.argv)
