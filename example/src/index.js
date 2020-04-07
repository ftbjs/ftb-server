import './index.scss'

if (true) {
  import(/* webpackChunkName: "dynamic-test" */ './test')
}
document.querySelector('#app').innerHTML = '<h1>Goodbye 2020</h1>\n<h1>Hello 2021</h1>'
