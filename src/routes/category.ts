import express from 'express'
const router = express.Router()
import CategoryController from '@/controller/category-controller'
import { authenticated } from '@/middleware/authentication'
import { AuthorizedMiddleware } from '@/middleware/authorization'
import { Roles } from '@/helpers/enum'
const { createCategory, getCategory, updateCategory, deleteCategory } = new CategoryController()

/**
 * Products routes
 */
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all categories
 *     description: Fetches all categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Electronics"
 *       500:
 *         description: Server error
 */

router.get('', getCategory)
export default router
