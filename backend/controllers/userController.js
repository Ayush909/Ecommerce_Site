const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel');    
const sendToken = require('../utils/sendToken');

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