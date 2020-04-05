export function createSchema(fn) {
  return fn(require('@hapi/joi'))
}

export function validate(obj, schema) {
  return schema.validate(obj)
}

export function validateSync(obj, schema) {
  const result = require('@hapi/joi').validate(obj, schema)
  if (result.error) {
    throw result.error
  }
}
