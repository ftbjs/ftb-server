import { findExistSync } from '../src/findExistSync'

jest.mock('fs')

describe('findExistSync', () => {
  it('should return true when the file is exists', () => {
    require('fs').__setMockFiles({
      '/project/util.js': 'module.exports = {};'
    })
    expect(findExistSync('.', '/project/util.js')).toBe(true)
  })

  it('should return true when the file does not exist', () => {
    require('fs').__setMockFiles({
      '/project/test.js': 'module.exports = {};'
    })
    expect(findExistSync('.', '/project/util.js')).toBe(false)
  })
})
