const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

//Create Product
exports.createProduct = catchAsyncError(async (req,res,next) => {
        
        req.body.createdBy = req.user.id;
        const product = await Product.create(req.body);

        res.status(201).json({
            success : true,
            product
        });
    
});

//Get All products
exports.getAllProducts = catchAsyncError(async (req,res,next) => {

    const productsPerPage = 5;
    const productCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(productsPerPage);
    // console.log('apifeature: ',apifeature)
    const products = await apifeature.query;
    res.status(200).json({
        success : true,
        products,
        productCount
    })
})

//Get single product details
exports.getProductDetails = catchAsyncError(async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler(400,"Product not found!"));
    }

    res.status(200).json({
        success : true,
        product
    })
});


//Update Products
exports.updateProduct = catchAsyncError(async (req,res,next) => {

    try{
        let product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler(400,"Product not found!"));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true,
            useFindAndModify : false
        })

        res.status(200).json({
            success : true,
            product
        })
    }catch(err){
        return next(new ErrorHandler(500,err));
    }

});

//Delete a product

exports.deleteProduct = catchAsyncError(async (req,res,next) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return  next(new ErrorHandler(500,"Product Not Found!"));
        }

        await product.remove();

        res.status(200).json({
            success : true,
            message : "Product deleted successfully"
        })

    }catch(err){
        return next(new ErrorHandler(500,err));
    }
})