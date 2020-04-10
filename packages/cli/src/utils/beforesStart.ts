import { findExistSync, logger } from '@ftb/shared'

const packageJson = 'package.json'
const nodeModules = 'node_modules'

export function beforeStart(api): void {
  const {
    webpackConfig: { context }
  } = api
  if (!findExistSync(context, packageJson)) {
    return
  }

  if (!findExistSync(context, nodeModules)) {
    logger.yellow(`We found current work directory has ${packageJson} file.`)
    logger.yellow(`But we cannot found that the ${nodeModules} was not installed.`)
  }
  // TODO add auto install dependencies logic
}
