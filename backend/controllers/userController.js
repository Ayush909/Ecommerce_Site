const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel');    

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

    res.status(201).json({
        success : true,
        user
    })
})