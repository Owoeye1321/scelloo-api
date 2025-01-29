import { FilterParams, Product } from '@/model/product-model'
import httpStatus from 'http-status'
import { NextFunction, Response, Request } from 'express'
import { Category } from '@/model/category-model'
import ApiError from '@/helpers/ApiError'
import { Op } from 'sequelize'

export default class ProductController {
  /**
   *
   * @param req THe procuct service crud operation starts here
   * @param res
   * @param next
   */
  //create product
  createProduct = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { name, description, categoryId } = req.body
      if (!name || !description || !categoryId)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          !name
            ? 'Kindly provide product name'
            : !categoryId
            ? 'Invalid categoryId'
            : 'Kindly provide product description'
        )
      const category = await (await Category.findOne({ where: { id: categoryId } }))?.toJSON()
      if (!category) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid category Id')
      const product = new Product({
        ...req.body,
        userId: req.user.id,
        categoryId
      })
      product.generateReference(7)
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Product Created Successfully',
        data: await product.save()
      })
    } catch (error) {
      next(error)
    }
  }
  //read product,
  //you could read all or read one
  getProduct = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const {
        productReference,
        limit = 5,
        offset = 0,
        search,
        categoryId,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder = 'ASC'
      } = req.query
      let filter: FilterParams = {}
      if (minPrice) filter.price = { [Op.gte]: minPrice }
      if (maxPrice) filter.price = { [Op.lte]: maxPrice }
      if (categoryId) filter.categoryId = categoryId
      // Define sorting
      let order: any[] = []
      if (sortBy) {
        order.push([sortBy, sortOrder])
      }
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Success',
        data: productReference
          ? (await Product.findOne({ where: { productReference }, include: 'category' })).toJSON()
          : search
          ? await Product.findAll({
              where: {
                name: {
                  [Op.iLike]: `%${search}%` // Partial match, case-insensitive
                }
              },
              limit,
              offset,
              order: order.length > 0 ? order : [['createdAt', 'DESC']]
            })
          : await Product.findAll({
              where: { ...filter },
              include: 'category',
              limit,
              offset,
              order: order.length > 0 ? order : [['createdAt', 'DESC']]
            })
      })
    } catch (error) {
      next(error)
    }
  }
  //update a product detail
  updateProduct = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { productReference } = req.query
      if (!productReference) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid category reference')
      await Product.update({ ...req.body }, { where: { productReference } })
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Product Updated Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
  //deleta a product detail
  deleteProduct = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const { productReference } = req.query
      const product = await Product.findOne({ where: { productReference } })
      await product.destroy()
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Product Deleted Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
