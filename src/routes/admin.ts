import express from 'express'
import AuthController from '@/controller/auth-controller'
import CategoryController from '@/controller/category-controller'
import { Roles } from '@/helpers/enum'
import { authenticated } from '@/middleware/authentication'
import { AuthorizedMiddleware } from '@/middleware/authorization'
const { admin } = new AuthController()
const { createCategory, updateCategory, deleteCategory } = new CategoryController()
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing User authentication
 */

/**
 * @swagger
 * /api/v1/admin/create:
 *   post:
 *     summary: Register a new admin user
 *     description: Creates a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.use('/create', admin)

/**
 * @swagger
 * /api/v1/admin/category:
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
router.post('/category', authenticated, AuthorizedMiddleware([Roles.ADMIN]), createCategory)
/**
 * @swagger
 * /api/v1/admin/category:
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
router.patch('/category', authenticated, AuthorizedMiddleware([Roles.ADMIN]), updateCategory)

/**
 * @swagger
 * /api/v1/admin/category:
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

router.delete('/category', authenticated, AuthorizedMiddleware([Roles.ADMIN]), deleteCategory)

export default router
