import { Sequelize } from 'sequelize'

export default interface DatabaseInterface {
  connect(): Promise<void>
}
