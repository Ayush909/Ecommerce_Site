const express = require('express');
const router = express.Router();
const {createOrder, getSingleOrder,myOrders, getAllOrders} = require('../controllers/orderController');
const {tokenValidation,authorizedRoles} = require('../middlewares/tokenValidation');

router.post('/new',tokenValidation,createOrder);
router.get('/order/:id',getSingleOrder);
router.get('/myorders',tokenValidation,myOrders);

router.get('/admin/allorders',tokenValidation,authorizedRoles("user"),getAllOrders);



module.exports = router;