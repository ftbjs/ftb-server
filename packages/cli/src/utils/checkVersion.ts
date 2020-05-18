import axios from 'axios'
import { getVersion } from './version'

const currentVersion = getVersion()
const REMOTE_VERSION_URL = 'https://registry.npmjs.com/@ftbjs/service'

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

  const latestVersion = res.data['dist-tags'].latest

  if (!latestVersion) {
    return false
  }
  return latestVersion !== currentVersion
}
