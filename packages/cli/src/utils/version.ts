// Cannot be `import` as it's not under TS root dir
const { version: VERSION } = require('../../package.json')

export function getVersion(): string {
  return VERSION
}
