import * as fs from 'fs'
import * as path from 'path'

export default (context: string, entry: string): boolean => {
  return fs.existsSync(path.resolve(context, entry))
}
