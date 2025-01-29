import { DataTypes, Model } from 'sequelize'
import Database from '@/database/database-class'
import { Category } from './category-model'
import User from './user-model'
import { customAlphabet } from 'nanoid'

export interface FilterParams {
  price?: any
  categoryId?: number
  sortBy?: 'price' | 'name' | 'stockQuantity'
  sortOrder?: 'ASC' | 'DESC'
}
export class Product extends Model {
  generateReference = function (strength: number) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ', strength)
    this.productReference = `PRD-${nanoid().toUpperCase()}`
  }
}
Product.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stockQuantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1
    },
    productReference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  { timestamps: true, sequelize: new Database().connection(), modelName: 'Products' }
)

Product.belongsTo(Category, {
  as: 'category',
  foreignKey: {
    name: 'categoryId'
  }
})
Product.belongsTo(User, { foreignKey: { name: 'userId' } })
