import * as path from 'path'
import { logger, fs } from '@ftbjs/shared'
import { ask } from './ask'
import { validateAppName } from './validate'

const resolve = p => path.resolve(__dirname, p)
const pakReplace = '{{packageName}}'
const desReplace = '{{description}}'

async function createLibrary({ appName, cmd }) {
  const { status, message } = validateAppName(appName, cmd)
  if (!status) {
    console.log(message)
    process.exit(1)
  }
  const answer = await ask()
  const templatePath = resolve(`../src/template`)

  const { description, packageName } = answer
  fs.copySync(templatePath, `${process.cwd()}/${appName}`)

  const packageJsonSource = fs.readFileSync(templatePath + '/package.json').toString()
  const result = packageJsonSource.replace(pakReplace, packageName).replace(desReplace, description)

  fs.writeFileSync(`${process.cwd()}/${appName}/package.json`, result)

  logger.cyan('🛠️  Created success!')
  logger.yellow('🌈 You can run the following command to install the dependencies!')
  logger.green(`    - cd ${appName}`)
  logger.green(`    - yarn install`)
}

export { createLibrary }
