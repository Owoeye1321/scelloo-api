import { Sequelize } from 'sequelize'

export default interface DatabaseInterface {
  connection(): Sequelize
}
