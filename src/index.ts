import app from './app'
import Database from './database/database-class'
import { APP_PORT } from './tools/config-environment'
import logger from './tools/logger'
const databaseInstance = new Database()

logger.info('connecting to database...')

try {
  app.listen(APP_PORT, async () => {
    databaseInstance.connection().authenticate()
    databaseInstance.connection().sync()
    console.log('Connection has been established successfully.')
    logger.info(`server listening on ${APP_PORT}`)
  })
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err)
})

// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on('SIGINT', async () => {
  databaseInstance.connection().close()
  logger.info('Mongoose default connection disconnected through app termination')
  process.exit(0)
})

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception: ' + err)
})
