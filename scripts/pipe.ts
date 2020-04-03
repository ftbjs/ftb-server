#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import shellJs from 'shelljs'

const cwd:string = process.cwd()
const ensureExist:boolean = fs.existsSync(path.resolve(cwd, 'packages/cli/lib/index.js'))

if (!ensureExist) {
  console.log('Could not find executable file: "packages/cli/lib/index.js"')
  console.log('Please run "npm run watch" to get this file')
  process.exit(0)
}

if (process.env.NODE_ENV === 'development') {
  shellJs.exec('node packages/cli/lib/index.js serve')
}

if (process.env.NODE_ENV === 'production') {
  shellJs.exec('node packages/cli/lib/index.js build')
}

if (process.env.NODE_ENV === 'localtest') {
  shellJs.cd('packages/cli')
  shellJs.exec('npm link')
}
