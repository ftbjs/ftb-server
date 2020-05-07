import * as path from 'path'
import shellJs from 'shelljs'
import glob from 'glob'

const PATH_ENTRY = path.resolve(__dirname, '../packages/**/package-lock.json')
const findTargetPath = glob.sync(PATH_ENTRY, {
  ignore: ['node_modules']
})

const cb = findTargetPath.filter(entry => {
  return entry.indexOf('node_modules') < 0
})

if (cb.length !== 0) {
  for (let i = 0; i < cb.length; i++) {
    shellJs.exec(`rm -rf ${cb[i]}`)
  }
}
