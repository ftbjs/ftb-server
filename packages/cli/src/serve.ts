import { Service } from './service'

const serve = () => {
  const service = new Service()
  console.log(service.validEntry())
  console.log(service.webpackConfigRaw())
}

export default serve
