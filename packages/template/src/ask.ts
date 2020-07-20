import inquirer from 'inquirer'
import { validateAppName } from './validate'
const npmPackageNameRule = /^[^_.-].+$/

interface ResolveValue {
  description: string
  projectName: string
  packageName: string
}

export function ask({ appName, cmd }): Promise<ResolveValue> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, message } = validateAppName(appName, cmd)
  if (!status) {
    console.log(message)
    process.exit(1)
  }
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: 'packageName',
          message: '请输入package名称:',
          validate: name => {
            if (!npmPackageNameRule.test(name)) {
              return `无效的package名字.`
            }
            return true
          }
        },
        {
          name: 'description',
          message: '请输入项目描述(可回车跳过):'
        }
      ])
      .then(answer => {
        resolve({ projectName: appName, ...answer })
      })
  })
}
