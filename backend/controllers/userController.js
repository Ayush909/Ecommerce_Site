const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel');    
const sendToken = require('../utils/sendToken');
const jwt = require('jsonwebtoken');

//Register a user
exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : "sample id",
            url : "sampleURL"
        }
    });

    sendToken(user,201,res);
})

//Login User
exports.loginUser = catchAsyncError(async (req,res,next) => {
    const {email, password} = req.body;
   

    if(!email || !password){
        return next(new ErrorHandler(401,"Please enter email & password both"));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler(400,"Invalid email or password"));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler(401,"Invalid email or password"));
    }

    sendToken(user,200,res);
})

//Logout a user
exports.logout = catchAsyncError( (req,res,next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    });

    res.status(200).json({
        success : true,
        message : "Logged out"
    });
})

//forgot password
exports.forgotPassword = catchAsyncError(async (req,res,next) => {
    const {email} = req.body;

    //check if email is given by user
    if(!email) {
        return next(new ErrorHandler(400,"Please provide a valid email"));
    }

    //check if given email exists in the Database
    const user = await User.findOne({email}).select('password');

    //if user not found
    if(!user){
        return next(new ErrorHandler(400,"User not found"));
    }
    
    console.log(user)

    //if user exists in Database, we will send reset link to their email
    const resetToken = jwt.sign({id : user._id},process.env.JWT_SECRET_KEY + user.password,{
        expiresIn : '15m'
    });

    
    const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`

    //we will send this unique url to the email provided only 
    //using nodemailer
    res.status(200).json({
        success : true,
        resetURL
    })


    next();
})


//reset password 
exports.resetPassword = catchAsyncError( async (req,res,next) => {
    const {token,newPassword} = req.body;
    const payload =jwt.decode(token)
    const userid = payload.id;

    //verify if user exists in database
    const user = await User.findById(userid).select('+password');

    //if user not found
    if(!user){
        return next(new ErrorHandler(400,"User not found"));
    }

    //if user exists we will verify if that token is correct
    const isOK = jwt.verify(token,process.env.JWT_SECRET_KEY + user.password);

    //set the new password and save
    user.password = newPassword;
    const newUser = await user.save();

    res.status(200).json({
        success: true,
        message: "Password has been reset"
    })

})

//get user details
exports.getUserDetails = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user
    })
})

//loggedIn User Password Update
exports.passwordUpdate = catchAsyncError( async (req,res,next) => {
    const {oldPassword, newPassword ,confirmNewPassword} = req.body;

    if(!oldPassword ||  !newPassword || !confirmNewPassword){
        next(new ErrorHandler(400,"Please enter all values"));
    }

    const user = await User.findById(req.user.id).select('+password');

    //checking if user entered correct old password
    const isPasswordMatch = await user.comparePassword(oldPassword);

    if(!isPasswordMatch){
        return next(new ErrorHandler(401,"Invalid email or password"));
    }

    //check if new password and confirm new password are equal
    if (newPassword !== confirmNewPassword) {
        return next(new ErrorHandler(400,"Password does not match"));
    }

    user.password = newPassword;
    await user.save();


    sendToken(user,201,res);
} )

//Update User Profile
exports.updateProfile = catchAsyncError ( async (req,res,next) => {
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        message : "Details Updated.",
        user
    })
})

// Get all the users(admin access only)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
});


// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(400,`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });

});

// update User Role -- Admin access only
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
});
  
// Delete User -- Admin access only
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });