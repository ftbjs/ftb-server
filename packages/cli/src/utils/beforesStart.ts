import inquirer from 'inquirer'
import shelljs from 'shelljs'
import { findExistSync, logger, spinner } from '@ftb/shared'

const packageJson = 'package.json'
const nodeModules = 'node_modules'

export async function beforeStart(api) {
  const {
    webpackConfig: { context }
  } = api
  if (!findExistSync(context, packageJson)) {
    return Promise.resolve()
  }

  // Check when the package.json doesn't have the dependencies
  const { devDependencies, dependencies } = require(`${context}/${packageJson}`)
  if (!devDependencies && !dependencies) {
    return Promise.resolve()
  }

  if (devDependencies && Object.keys(devDependencies).length === 0) {
    return Promise.resolve()
  }

  if (dependencies && Object.keys(dependencies).length === 0) {
    return Promise.resolve()
  }

  if (!findExistSync(context, nodeModules)) {
    logger.yellow(`We found current work directory has ${packageJson} file.`)
    logger.yellow(`But we cannot found that the ${nodeModules} was not installed. \n\n`)

    return new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'status',
            message: 'Does it automatically install dependencies for you?',
            choices: ['Yes', 'No']
          }
        ])
        .then(answer => {
          if (answer.status === 'Yes') {
            const spinnerDownloading = spinner(
              `${logger.cyan('\nDependencies will be installed for you soon.')}\n`
            ).start('Downloading...\n')
            if (shelljs.exec('npm install').code === 0) {
              spinnerDownloading.succeed(`Installed successfully.\n`)
              spinnerDownloading.stop()
              resolve()
            } else {
              spinnerDownloading.fail(`${logger.red('Got some error when install dependencies.')}`)
              reject()
            }
          } else {
            resolve()
          }
        })
        .catch(() => {
          logger.red('Error when checking for the need to install dependencies.')
          reject()
        })
    })
  }
}
