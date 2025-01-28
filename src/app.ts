import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { morganSuccessHandler, morganErrorHandler } from './tools/morgan'
import { IS_TEST, APP_PREFIX_PATH, APP_NAME } from './tools/config-environment'
import httpStatus from 'http-status'
import ApiError from './helpers/ApiError'
import { errorConverter, errorHandler } from './helpers/error'
import path from 'path'

const app = express()

if (!IS_TEST) {
  app.use(morganSuccessHandler)
  app.use(morganErrorHandler)
}

// set security HTTP headers
app.use(helmet())

// set ejs as template engine
app.set('view engine', 'ejs')

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(express.static('assets'))

app.get('/', (_req, res) => {
  res.status(httpStatus.OK).send({
    service: `${APP_NAME}`,
    message: `Welcome to the ${APP_NAME}. Worker magic happens here!`
  })
})

// This route serve the uploaded files
app.use('/storage', express.static(path.join(__dirname, 'storage')))

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
