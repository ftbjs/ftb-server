export function createSchema(fn) {
  return fn(require('@hapi/joi'))
}

export function validate(obj, schema) {
  return schema.validate(obj)
}
