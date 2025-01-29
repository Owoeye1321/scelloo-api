import { DataTypes, Model, Optional } from 'sequelize'
import Database from '@/database/database-class'
import { Roles } from '@/helpers/enum'
import crypto from 'crypto'
import { seal } from '@/middleware/authentication'
import { JWT_SECRET, JWT_EXPIRE } from '@/tools/config-environment'

interface IUser {
  id?: number
  fullName: string
  role: string
  password: string
  email: string
}

interface IUserModel extends IUser {}

export default class User extends Model<IUserModel> {
  // Ensure the instance methods are properly registered
  setPassword = async function (password: string): Promise<void> {
    this.password = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 32, 'sha512').toString('hex')
  }

  validPassword = function (password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 32, 'sha512').toString('hex')
    return this.password === hash
  }

  generateIndividualJWT = async function (): Promise<string> {
    const token = await seal(
      {
        _id: this.id,
        name: this.fullName,
        email: this.email,
        role: this.role
      },
      JWT_SECRET,
      JWT_EXPIRE
    )
    console.log(token)

    return token
  }
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: Roles.SELLER
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  },
  {
    timestamps: true,
    sequelize: new Database().connection(),
    modelName: 'Users'
  }
)
