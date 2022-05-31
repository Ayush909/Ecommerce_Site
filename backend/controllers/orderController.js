const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');


exports.createOrder = catchAsyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        orderBy: req.user._id,
      });

      res.status(201).json({
        success: true,
        order
      });
})

// Get Single Order Details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    .populate("orderBy","name email")
    .populate("orderItems.product","name price");
  
    if (!order) {
      return next(new ErrorHandler(404,"Order not found."));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
});