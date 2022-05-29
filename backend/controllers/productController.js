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
    

});

//Delete a product

exports.deleteProduct = catchAsyncError(async (req,res,next) => {
  
    const product = await Product.findById(req.params.id);

    if(!product){
        return  next(new ErrorHandler(404,"Product Not Found!"));
    }

    await product.remove();

    res.status(200).json({
        success : true,
        message : "Product deleted successfully"
    })

   
})

//create a review or update an existing review
exports.createReview =  catchAsyncError(async (req,res,next) => {
    const {rating,comment,productId} = req.body;

    if(!rating || !comment || !productId){
        return next(new ErrorHandler(400, "Please provide all fields"));
    }

    const review = {
        createdBy : req.user._id,
        name : req.user.name,
        rating : +rating,
        comment
    }

    //check if product exists
    const product = await Product.findById(productId);
    if(!product){
        return  next(new ErrorHandler(404,"Product Not Found!"));
    }

    //return true if reviews array already contains a review by the same user
    const isReviewed = product.reviews.find((rev) => rev.createdBy.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.createdBy.toString() === req.user._id.toString()){
            rev.rating = rating;
            rev.comment = comment;
          }
        });
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    //calculating overall product rating based on individual usere ratings
    let avg = 0;

    product.reviews.forEach((rev) => {
    avg += rev.rating;
    });
    
    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
})

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander(404,"Product not found"));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
});

// Delete a product review
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const {productId , reviewId} = req.query;

    if(!productId || !reviewId){
        return next(new ErrorHandler(400,"Please provide both review and product Ids"))
    }
    
    const product = await Product.findById(productId);

    
  
    if (!product) {
      return next(new ErrorHandler(404,"Product not found"));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== reviewId.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });