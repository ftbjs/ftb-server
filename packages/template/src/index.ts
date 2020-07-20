import * as path from 'path'
import fs from 'fs-extra'
import { logger } from '@ftbjs/shared'
import { ask } from './ask'

const resolve = p => path.resolve(__dirname, p)
const pakReplace = '{{packageName}}'
const desReplace = '{{description}}'

async function createLibrary({ appName, cmd }) {
  const answer = await ask({ appName, cmd })
  const templatePath = resolve(`../src/template`)

  const { projectName, description, packageName } = answer
  fs.copySync(templatePath, `${process.cwd()}/${projectName}`)

  const packageJsonSource = fs.readFileSync(templatePath + '/package.json').toString()
  const result = packageJsonSource.replace(pakReplace, packageName).replace(desReplace, description)

  fs.writeFileSync(`${process.cwd()}/${projectName}/package.json`, result)

  logger.cyan('🛠️  Created success!')
  logger.yellow('🌈 You can run the following command to install the dependencies!')
  logger.green(`    - cd ${projectName}`)
  logger.green(`    - yarn install`)
}

export { createLibrary }
