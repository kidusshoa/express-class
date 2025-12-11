import express from 'express'

import {createProduct, getProductById, getProducts, updateProduct} from '../controllers/productController.js'

import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createProduct).get(protect, getProducts);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct)

export default router;