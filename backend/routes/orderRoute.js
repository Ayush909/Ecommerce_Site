const express = require('express');
const router = express.Router();
const {createOrder, getSingleOrder} = require('../controllers/orderController');
const {tokenValidation} = require('../middlewares/tokenValidation');

router.post('/new',tokenValidation,createOrder);

router.get('/order/:id',getSingleOrder);

module.exports = router;