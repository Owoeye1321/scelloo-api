import express from 'express'
const router = express.Router()
import ProductController from '@/controller/product-controller'
import { Roles } from '@/helpers/enum'
import { authenticated } from '@/middleware/authentication'
import { AuthorizedMiddleware } from '@/middleware/authorization'
const { createProduct, getProduct, deleteProduct, updateProduct } = new ProductController()
/**
 * Products routes
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphone"
 *               price:
 *                 type: number
 *                 example: 199.99
 *               stock:
 *                 type: number
 *                 example: 10
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post('', authenticated, AuthorizedMiddleware([Roles.SELLER]), createProduct)
/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         description: Filter products by category ID
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: minPrice
 *         in: query
 *         description: Filter products by minimum price
 *         required: false
 *         schema:
 *           type: number
 *           example: 100
 *       - name: maxPrice
 *         in: query
 *         description: Filter products by maximum price
 *         required: false
 *         schema:
 *           type: number
 *           example: 500
 *       - name: search
 *         in: query
 *         description: Filter products by name (partial match)
 *         required: false
 *         schema:
 *           type: string
 *           example: "smartphone"
 *       - name: sortBy
 *         in: query
 *         description: Sort products by a field (e.g. price, name, stock)
 *         required: false
 *         schema:
 *           type: string
 *           example: "price"
 *       - name: sortOrder
 *         in: query
 *         description: Sort order for the products. Use 'asc' for ascending or 'desc' for descending.
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: "asc"
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('', getProduct)

/**
 * @swagger
 * /api/v1/product:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - price
 *               - stock
 *               - categoryId
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Updated Smartphone"
 *               price:
 *                 type: number
 *                 example: 249.99
 *               stock:
 *                 type: number
 *                 example: 5
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 */
router.patch('', authenticated, AuthorizedMiddleware([Roles.SELLER]), updateProduct)

/**
 * @swagger
 * /api/v1/product:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete('', authenticated, AuthorizedMiddleware([Roles.SELLER]), deleteProduct)
export default router
