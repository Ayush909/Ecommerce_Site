const express = require('express');
const { getAllProducts, createProduct,updateProduct,deleteProduct,getProductDetails } = require('../controllers/productController');
const {tokenValidation,authorizedRoles} = require('../middlewares/tokenValidation');
const router = express.Router();


router.get('/',getAllProducts);

router.post('/new',tokenValidation,authorizedRoles("admin"),createProduct);

router.put('/:id',tokenValidation,authorizedRoles("admin"),updateProduct);

router.delete('/:id',tokenValidation,authorizedRoles("admin"),deleteProduct);

router.get('/:id',getProductDetails);

module.exports = router;