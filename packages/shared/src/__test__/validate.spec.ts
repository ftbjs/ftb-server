import { validate, createSchema } from '../validate'

describe('validate', () => {
  const schema = createSchema(joi =>
    joi.object({
      publicPath: joi.string().allow(''),
      outputDir: joi.string()
    })
  )

  const mockConfig = (config = {}) => {
    const baseConfig = {
      publicPath: '/',
      outputDir: 'dist'
    }
    return { ...baseConfig, ...config }
  }

  it('should return error value with undefined', () => {
    expect(validate(mockConfig(), schema).error).toBe(undefined)
  })

  it('should return correct error message "test" is not allowed', () => {
    const mockConfigValue = mockConfig({ test: '' })
    expect(validate(mockConfigValue, schema).error.details[0].message).toBe('"test" is not allowed')
  })
})
