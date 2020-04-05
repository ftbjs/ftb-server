import webpack from 'webpack'
import { logger } from '@ftb/shared'
import { prod } from './config/prod'
import { Service } from './Service'

export default function build() {
  // Delete the old build dir before a new build start.
  const service = new Service()

  webpack(prod(service), async (err, stats) => {
    if (err) {
      throw err
    }

    if (stats.hasErrors()) {
      logger.red(`Project got build error. ${stats.toString()}`)
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )
  })
}
