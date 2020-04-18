export function sum(x, y) {
  return x + y
}

if (process.env.NODE_ENV === 'development') {
  document.querySelector('body').innerHTML = '<h1>Goodbye 2020</h1>\n<h1>Hello 2021</h1>'
}
