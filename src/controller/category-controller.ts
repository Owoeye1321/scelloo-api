import ApiError from '@/helpers/ApiError'
import { Category } from '@/model/category-model'
import { NextFunction, Response, Request } from 'express'
import httpStatus from 'http-status'

export default class CategoryController {
  /**
   *
   * @param req THe procuct service crud operation starts here
   * @param res
   * @param next
   */
  //create category
  createCategory = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const category = new Category({
        ...req.body
      })
      category.generateReference(7)
      res.status(httpStatus.OK).json({
        message: 'Category Created Successfully',
        data: await category.save()
      })
    } catch (error) {
      next(error)
    }
  }
  //read category,
  //you could read all or read one
  getCategory = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { categoryReference = '', limit = 5, offset = 0 } = req.query
      res.status(httpStatus.OK).json({
        message: 'Success',
        data: categoryReference
          ? (await Category.findOne({ where: { categoryReference } }))?.toJSON()
          : await Category.findAll({ limit, offset })
      })
    } catch (error) {
      next(error)
    }
  }
  //update a category detail
  updateCategory = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { categoryReference } = req.query
      if (!categoryReference) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid category reference')
      await Category.update({ name: req.body.name }, { where: { categoryReference } })
      res.status(httpStatus.OK).json({
        message: 'Category Updated Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
  //deleta a category detail
  deleteCategory = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { categoryReference } = req.query
      const category = await Category.findOne({ where: { categoryReference } })
      await category.destroy()
      res.status(httpStatus.OK).json({
        message: 'Category Deleted Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
