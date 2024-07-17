import { configure } from "./config/index.js"

export const conf = configure()

import logger from "./logger/winston.js"
import * as Db from "./db.js"
import { app } from "./app.js"

// The signals we want to handle
// NOTE: although it is tempting, the SIGKILL signal (9) cannot be intercepted and handled
const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
}
// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
  logger.warn("shutdown!")
  Db.closeAll()
  process.exit(value)
}

const main = async () => {
  await Db.connect(conf.MONGODB_CONNECTION_URI)
  app.listen(conf.PORT, () => {
    logger.info(`listening on port ${conf.PORT}`)
  })

  // Create a listener for each of the signals that we want to handle
  Object.values(signals).forEach((signal) => {
    // @ts-ignore
    process.on(signal, () => {
      logger.warn(`process received a ${signal} signal`)
      shutdown(signal, signals[signal])
    })
  })
}

try {
  main()
} catch (err) {
  logger.error(err)
  process.exit(1)
}
