const express = require('express');
const { getAllProducts, createProduct,updateProduct,deleteProduct,getProductDetails } = require('../controllers/productController');
const router = express.Router();

router.get('/',getAllProducts);

router.post('/new',createProduct);

router.put('/:id',updateProduct);

router.delete('/:id',deleteProduct);

router.get('/:id',getProductDetails);

module.exports = router;