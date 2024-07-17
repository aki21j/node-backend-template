import winston from "winston"
const { transports, format, createLogger } = winston
const { combine, printf } = format

const logTime = new Date().toLocaleDateString()
const customLog = printf(({ level, message }) => {
  return `[${level}]:[${logTime}]:[${message}]`
})

// Custom date for logging files with date of occurance
const date = new Date()
const newdate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

const options = {
  info: {
    level: "info",
    dirname: "logs",
    json: true,
    handleExceptions: true,
    datePattern: "YYYY-MM-DD-HH",
    filename: `combined-outerr.log`,
  },
  error: {
    level: "error",
    dirname: "logs",
    json: true,
    handleExceptions: true,
    filename: `err.log`,
  },
  console: {
    level: "debug",
    json: false,
    handleExceptions: true,
    colorize: true,
  },
}

const logger = new createLogger({
  format: combine(customLog, winston.format.colorize({ all: true })),
  transports: [
    new transports.File(options.info),
    new transports.File(options.error),
    new transports.Console(options.console),
  ],
  exitOnError: false,
})

export default logger
