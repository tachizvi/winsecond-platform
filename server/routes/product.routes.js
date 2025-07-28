const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/', authMiddleware, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
