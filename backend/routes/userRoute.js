const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logout,forgotPassword, resetPassword, getUserDetails, passwordUpdate} =  require('../controllers/userController');
const { tokenValidation } = require('../middlewares/tokenValidation');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logout);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password',resetPassword);

router.get('/userdetails',tokenValidation, getUserDetails);

router.put('/password/update',tokenValidation,passwordUpdate);

module.exports = router;