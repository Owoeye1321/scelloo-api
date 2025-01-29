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
 *   post:
 *     summary: Create a new category
 *     description: Only accessible by ADMIN users.
 *     tags: [Categories]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
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

/**
 * @swagger
 * /api/v1/category:
 *   patch:
 *     summary: Update a category
 *     description: Only accessible by ADMIN users.
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Home Appliances"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/category:
 *   delete:
 *     summary: Delete a category
 *     description: Only accessible by ADMIN users.
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.post('', authenticated, AuthorizedMiddleware([Roles.ADMIN]), createCategory)
router.get('', getCategory)
router.patch('', authenticated, AuthorizedMiddleware([Roles.ADMIN]), updateCategory)
router.delete('', authenticated, AuthorizedMiddleware([Roles.ADMIN]), deleteCategory)
export default router
