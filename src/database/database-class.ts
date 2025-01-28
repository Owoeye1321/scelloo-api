import { Sequelize } from 'sequelize'
import DatabaseInterface from './database-interface'
import { DB, DB_URI, ENVIRONMENT } from '@/tools/config-environment'
import ApiError from '@/helpers/ApiError'
import httpStatus from 'http-status'

export default class Database implements DatabaseInterface {
  async connect(): Promise<void> {
    try {
      if (ENVIRONMENT === 'production') {
        await this.productionDatabase().authenticate()
      }
      await this.developmentDatabase().authenticate()
    } catch (error) {
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message)
    }
  }

  private developmentDatabase(): Sequelize {
    return new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
      host: DB.HOST,
      dialect: 'mysql'
    })
  }

  private productionDatabase(): Sequelize {
    return new Sequelize(DB_URI)
  }
}
