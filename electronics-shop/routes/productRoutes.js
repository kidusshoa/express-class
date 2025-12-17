import express from 'express';
import { createProduct } from '../controllers/productController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createProduct);

export default router;