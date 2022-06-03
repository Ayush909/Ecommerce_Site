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

// get Orders of logged in users
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ orderBy: req.user._id });
  
    res.status(200).json({
      success: true,
      orders
    });
});

// Get Details of All Orders -- Admin Access only
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders
    });
});

//updating order status -- admin access only
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const {id} = req.params;

  const order = await Order.findById(id);

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler(400, "Order is already Devlivered"));
  }

  order.orderItems.forEach(order => {
    await updateStock(order.product,order.quantity);
  })

  order.orderStatus = req.body.status;
  

  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success : true,
    order
  })

})  