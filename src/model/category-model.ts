import { DataTypes, Model } from 'sequelize'
import Database from '@/database/database-class'
import { customAlphabet } from 'nanoid'

export class Category extends Model {
  generateReference = function (strength: number) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ', strength)
    this.categoryReference = `CAT-${nanoid().toUpperCase()}`
  }
}
Category.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    categoryReference: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: true, sequelize: new Database().connection(), modelName: 'Categories' }
)
