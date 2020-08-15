import { inquirer } from '@ftbjs/shared'

const npmPackageNameRule = /^[^_.-].+$/

interface ResolveValue {
  description: string
  packageName: string
}

export function ask(): Promise<ResolveValue> {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: 'packageName',
          message: 'Please enter the package name:',
          validate: name => {
            if (!npmPackageNameRule.test(name)) {
              return `Invalid package name.`
            }
            return true
          }
        },
        {
          name: 'description',
          message: 'Please enter the project description (enter to skip):'
        }
      ])
      .then(answer => {
        resolve(answer)
      })
  })
}
