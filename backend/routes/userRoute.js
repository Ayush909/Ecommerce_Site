const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logout,forgotPassword, resetPassword, getUserDetails, passwordUpdate, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} =  require('../controllers/userController');
const { tokenValidation,authorizedRoles } = require('../middlewares/tokenValidation');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logout);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password',resetPassword);

//get all user details on our database - Admin only
router.get('/admin/allusers',tokenValidation,authorizedRoles("admin"),getAllUser);

//get own user details
router.get('/userdetails',tokenValidation, getUserDetails);

//get single user detail -- Admin only
router.get('/admin/user/:id',tokenValidation,authorizedRoles("admin"),getSingleUser);

//update user role - Admin only
router.put('/admin/user/:id',tokenValidation,authorizedRoles("admin"),updateUserRole);

//delete user - Admin only
router.delete('/admin/user/:id',tokenValidation,authorizedRoles("admin"),deleteUser);

//Update password of logged In user
router.put('/password/update',tokenValidation,passwordUpdate);

// Update details like name,email,avatar of loggedIn user
router.put('/me/update',tokenValidation,updateProfile);

module.exports = router;