import ApiError from '@/helpers/ApiError'
import * as process from 'process'

export const ENVIRONMENT = process.env.APP_ENV || 'development'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 5050
export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/'

export const DB_PROD_URI = process.env.DB_PROD_URI
export const DB_DEV_URI = process.env.DB_DEV_URI
export const APP_NAME = 'Scelloo Service'

export const breakPoint = () => {
  throw new ApiError(200, 'break point')
}

export const JWT_SECRET = process.env.JWT_SECRET || 'thT9x1TP9y2022Serv1ceis'
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d'
