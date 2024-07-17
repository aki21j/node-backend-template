import logger from "./logger/winston.js"
import mongo from "mongodb"
import { AVAILABLE_COLLECTIONS } from "./constants.js"
import { getSettings } from "./config/index.js"

const MongoClient = mongo.MongoClient

// singleton
const dbs = {}
const clients = []
const setDb = (uri, db) => {
  logger.info(`setting db with name: ${uri}`)
  dbs[uri] = db
  logger.info(`dbs available: ${Object.keys(dbs).join(",")}`)
}

export const get = (uri) => {
  if (!dbs[uri]) {
    logger.error(`db with name: ${uri} not found`)
  }
  return dbs[uri]
}

export const connect = async (connectionUri) => {
  logger.info(`uri: ${connectionUri}`)

  const client = await MongoClient.connect(connectionUri, {
    useNewUrlParser: true,
    ignoreUndefined: true,
  })
  const db = client.db()
  setDb(connectionUri, db)
  clients.push(client)
  return db
}

export const getCollection = (
  name,
  uri = getSettings().MONGODB_CONNECTION_URI
) => {
  const db = get(uri)
  return db.collection(name)
}

export const closeAll = () => {
  logger.info(`closing db clients total : ${clients.length}`)
  clients.forEach((client) => {
    client.close()
  })
  logger.info("all db connections closed")
}
