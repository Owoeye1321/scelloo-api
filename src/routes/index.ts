import express from 'express'
import auth from './auth'
import product from './product'
import category from './category'
const router = express.Router()
router.use('/auth', auth)
router.use('/product', product)
router.use('/category', category)
export default router
