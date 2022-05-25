const express = require('express');
const router = express.Router();

const {registerUser,loginUser,logout,forgotPassword} =  require('../controllers/userController');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logout);

router.post('/forgot-password',forgotPassword)

module.exports = router;