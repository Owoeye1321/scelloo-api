import express from 'express'
import auth from './auth'
import product from './product'
import category from './category'
import admin from './admin'
const router = express.Router()
router.use('/auth', auth)
router.use('/product', product)
router.use('/category', category)
router.use('/admin', admin)
export default router
