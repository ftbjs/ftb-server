import axios from 'axios'
import { getVersion } from './version'

const currentVersion = getVersion()
const REMOTE_VERSION_URL = 'https://www.npmjs.com/package/@ftbjs/service'

axios.defaults.timeout = 10000

export async function checkVersion() {
  let res
  try {
    res = await axios.get(REMOTE_VERSION_URL)
  } catch (error) {
    // console.log('catch error when fetch the version')
  }

  if (!res) {
    return false
  }

  const matchRule = /"version":"([^"]+)"/
  const matchresult = res.data.match(matchRule)

  if (!matchresult) {
    return false
  }
  return matchresult[1] !== currentVersion
}
