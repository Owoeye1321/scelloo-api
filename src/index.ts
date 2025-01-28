import app from './app'
import Database from './database/database-class'
import sequelize from './database/database-class'
import { APP_PORT, DB_URI, DB, IS_TEST } from './tools/config-environment'
import logger from './tools/logger'

let dbURI: string
if (DB.HOST && DB.NAME && DB.PASSWORD && DB.USER) {
  dbURI = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${DB.HOST}:${DB.PORT}/${DB.NAME}`
} else {
  dbURI = DB_URI
}

if (IS_TEST) {
  dbURI += '-test'
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}

logger.debug(dbURI)
logger.info('connecting to database...')

try {
  new Database().connect()
  console.log('Connection has been established successfully.')
  app.listen(APP_PORT, () => {
    logger.info(`server listening on ${APP_PORT}`)
  })
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err)
})
