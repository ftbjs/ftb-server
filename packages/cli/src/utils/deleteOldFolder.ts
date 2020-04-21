import shelljs from 'shelljs'
import { findExistSync, logger, spinner } from '@ftb/shared'

export function deleteOldFolder(api) {
  if (findExistSync(api.webpackConfig.context, 'dist')) {
    const spinnerloading = spinner(`${logger.cyan('\nFound old build folder.')}\n`).start('Start deleting...\n')
    if (shelljs.exec('rm -rf dist').code === 0) {
      spinnerloading.succeed(`Successful deletion of old folder.\n`)
      spinnerloading.stop()
    } else {
      spinnerloading.fail(`${logger.red('Got some error when deleting old build folder.')}`)
    }
  }
}
