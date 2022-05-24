const jwt = require('jsonwebtoken');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');


const tokenValidation = catchAsyncError( async (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler(401,"Please login to access this resource"));
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodeData.id);

    next();
})

module.exports = tokenValidation;