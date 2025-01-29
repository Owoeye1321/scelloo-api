import ApiError from '@/helpers/ApiError'
import User from '@/model/user-model'
import { NextFunction, Response, Request } from 'express'
import httpStatus from 'http-status'

export default class AuthController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, password, email } = req.body
      if (!fullName || !password || password?.length < 8 || !email)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          !fullName
            ? 'Kindly provide fullName'
            : !email
            ? 'Kindly provide an email'
            : 'Invalid password, password must be at least 8 charactoers'
        )
      const userExist = (await User.findOne({ where: { email } })).toJSON()
      if (userExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist')
      const user = new User({
        fullName,
        email
      })
      user.setPassword(password)
      await user.save()
      res.status(httpStatus.OK).json({
        message: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      if (!email || !password)
        throw new ApiError(httpStatus.BAD_REQUEST, !email ? 'Kindly provide an email' : 'Invalid password')
      const user = (await User.findOne({ where: { email } })).toJSON()
      if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Email')
      const userInstance = new User(user)
      if (!userInstance.validPassword(password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user credentials')
      const token = (await userInstance.generateIndividualJWT()).toString()
      res.status(httpStatus.OK).json({
        message: 'message',
        data: {
          token
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
