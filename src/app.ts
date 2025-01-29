import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { morganSuccessHandler, morganErrorHandler } from './tools/morgan'
import { IS_TEST, APP_PREFIX_PATH, APP_NAME } from './tools/config-environment'
import httpStatus from 'http-status'
import ApiError from './helpers/ApiError'
import { errorConverter, errorHandler } from './helpers/error'
import path from 'path'
import rateLimit from 'express-rate-limit'
import routes from './routes'
import * as swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { swaggerOptions } from './swagger'

const app = express()

if (!IS_TEST) {
  app.use(morganSuccessHandler)
  app.use(morganErrorHandler)
}
//configure swagger
const config = swaggerJsdoc(swaggerOptions)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(config, { explorer: true }))

// set security HTTP headers
app.use(helmet())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (req, res, next, options) => res.status(options.statusCode).send(options.message)
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

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
app.use(APP_PREFIX_PATH, routes)

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
