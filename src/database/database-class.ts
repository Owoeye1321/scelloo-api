import { Sequelize } from 'sequelize'
import DatabaseInterface from './database-interface'
import { DB_DEV_URI, DB_PROD_URI, ENVIRONMENT } from '@/tools/config-environment'
import ApiError from '@/helpers/ApiError'
import httpStatus from 'http-status'

export default class Database implements DatabaseInterface {
  connection(): Sequelize {
    try {
      if (ENVIRONMENT === 'production') return this.productionDatabase()
      return this.developmentDatabase()
    } catch (error) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message)
    }
  }

  private developmentDatabase(): Sequelize {
    return new Sequelize(DB_DEV_URI, {
      dialect: 'postgres'
    })
  }

  private productionDatabase(): Sequelize {
    return new Sequelize(DB_PROD_URI, { dialect: 'postgres' })
  }
}
