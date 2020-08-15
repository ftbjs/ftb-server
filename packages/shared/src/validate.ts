export function createSchema(fn) {
  return fn(require('joi'))
}

export function validate(obj, schema) {
  return schema.validate(obj)
}
