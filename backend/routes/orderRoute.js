const express = require('express');
const router = express.Router();
const {createOrder} = require('../controllers/orderController');
const {tokenValidation} = require('../middlewares/tokenValidation');

router.post('/new',tokenValidation,createOrder);

module.exports = router;