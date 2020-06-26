<h1 align="center">Welcome to ftb-service 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/@ftbjs/service" />
  <a href=" " target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ftbjs/ftb-service/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ftbjs/ftb-service/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ftbjs/ftb-service" />
  </a>
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/ftbjs/ftb-service" />

</p>

> A tool to start a server with Webpack. support hot module replacement and build.

### 🏠 [Homepage](https://github.com/ftbjs/ftb-service#readme)

### ✨ [Example](https://github.com/ftbjs/ftb-service/tree/master/example)

## Install

**Global**

```sh
npm i @ftbjs/service -g
```

**Local**

```sh
npm i @ftbjs/service -D
```

## Usage

**Global**

```js
// start a local serve
ftbjs serve

// build project
ftbjs build

// visualize size of webpack output files
ftbjs build --analyzer
```

**Local**

Add below code in your project's package.json

```js
...
"scripts": {
  "dev": "ftbjs serve",
  "build": "ftbjs build",
  "analyzer": "ftbjs build --analyzer"
},
...
```

## ftb.config.js

```js
module.exports = {
  devServer: {
    port: 2021,
    open: true
  },
  packages: true, // for build library need to set it as true
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('my-test.min.js').library('MyTest').libraryTarget('umd')
    }
  }
}
```

## Required

You need to have a src folder. and its has a index.js file. then run the `ftbjs serve` or `ftbjs build`. For more information please see [Example](https://github.com/ftbjs/ftb-service/tree/master/example)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ftbjs/ftb-service/issues). You can also take a look at the [contributing guide](https://github.com/ftbjs/ftb-service/tree/master/Contribution.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [biyuqiwan@163.com](https://github.com/BiYuqi).<br /> This project is [MIT](https://github.com/ftbjs/ftb-service/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
