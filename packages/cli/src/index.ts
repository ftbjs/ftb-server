#!/usr/bin/env node

import commander from 'commander'
import serve = require('./serve')
import build = require('./build')

commander
  .version('0.0.0', '-v, --version')
  .usage('<command> [Options]')

commander
  .command('serve [entry]')
  .description('Setup a local server.')
  .action((entry, cmd) => {
    serve(entry, cmd)
  })

commander
  .command('build [entry]')
  .description('Build project')
  .action((entry, cmd) => {
    build(entry, cmd)
  })

commander
  .command('*')
  .description('Type a wrong command. Please try `ftb-service -h`.')
  .action((name, other) => {
    console.log('Please try `ftb-service -h`, Get the whole feature list.')
  })

commander.parse(process.argv)