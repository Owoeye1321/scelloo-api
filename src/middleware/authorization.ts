import httpStatus from 'http-status'

export const AuthorizedMiddleware = (allowedRoles: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: 'Unauthorized to perform action'
        })
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}
