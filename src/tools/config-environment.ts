import ApiError from '@/helpers/ApiError'
import * as process from 'process'

export const ENVIRONMENT = process.env.APP_ENV || 'development'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 5050
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/'

export const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017
}
export const DB_URI = process.env.DB_URI
export const APP_NAME = 'Scelloo Service'

export const breakPoint = () => {
  throw new ApiError(200, 'break point')
}

export const JWT_SECRET = process.env.JWT_SECRET || 'thT9x1TP9y2022Serv1ceis'
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d'
