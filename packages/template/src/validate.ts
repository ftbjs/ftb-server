import { logger, findExistSync, shelljs } from '@ftbjs/shared/lib'

interface ReturnValue {
  message: string
  status: boolean
}

export function validateAppName(appName: string, cmd: []): ReturnValue {
  const res = appName.split(/\s/)
  const getAppName = res[0]

  if (findExistSync(process.cwd(), getAppName)) {
    if (cmd[cmd.length - 1] === '-f') {
      shelljs.rm('-rf', `./${getAppName}`)
      return {
        message: '',
        status: true
      }
    }

    return {
      message: `The directory is exists, if you want to delete it, you can input: ${logger.green.raw(
        `ftbjs create ${getAppName} -f`
      )}`,
      status: false
    }
  }

  return {
    message: '',
    status: true
  }
}
