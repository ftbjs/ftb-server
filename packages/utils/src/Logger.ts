import chalk from 'chalk'

const colors: Array<string> = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'blackBright',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright'
]

const bgColors:Array<string> = [
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'bgGray',
  'bgRedBright',
  'bgGreenBright',
  'bgYellowBright',
  'bgBlueBright',
  'bgMagentaBright',
  'bgCyanBright',
  'bgWhiteBright'
]

const log = console.log
const logger: any = {}
const combineProperty = [...colors, ...bgColors]

combineProperty.map(item => {
  logger[item] = (...info: Array<string>) => log(chalk[item](info.join(' ')))
  logger[item].raw = chalk[item]
})

export default logger