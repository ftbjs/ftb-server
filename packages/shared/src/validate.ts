export function createSchema(fn) {
  return fn(require('@hapi/joi'))
}

export function validate(obj, schema, cb) {
  require('@hapi/joi').validate(obj, schema, {}, err => {
    if (err) {
      cb(err.message)
    }
  })
}

export function validateSync(obj, schema) {
  const result = require('@hapi/joi').validate(obj, schema)
  if (result.error) {
    throw result.error
  }
}
