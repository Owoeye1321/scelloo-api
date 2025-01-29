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
 *     description: Fetches all categories, optionally filtered by categoryReference.
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: categoryReference
 *         schema:
 *           type: string
 *         description: Reference ID of the category to filter results.
 *     responses:
 *       200:
 *         description: A category object or multiple categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *       400:
 *         description: Invalid query parameter
 *       500:
 *         description: Server error
 */
router.get('', getCategory)
export default router
