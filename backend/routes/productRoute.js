const express = require('express');
const { getAllProducts, createProduct,updateProduct,deleteProduct,getProductDetails } = require('../controllers/productController');
const {tokenValidation,authorizedRoles} = require('../middlewares/tokenValidation');
const router = express.Router();


router.get('/',getAllProducts);

router.post('/admin/new',tokenValidation,authorizedRoles("admin"),createProduct);

router.put('/admin/:id',tokenValidation,authorizedRoles("admin"),updateProduct);

router.delete('/admin/:id',tokenValidation,authorizedRoles("admin"),deleteProduct);

router.get('/:id',getProductDetails);

module.exports = router;