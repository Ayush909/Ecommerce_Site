const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    shippingInfo : {
        city: {
            type : String,
            required : true
        },
        address: {
            type : String,
            required : true
        },
        state: {
            type : String,
            required : true
        },
        country: {
            type : String,
            required : true
        },
        pincode : {
            type : Number,
            required : true
        },
        phone : {
            type : Number,
            required : true
        }
    },
    orderItems : [
        {
            name : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            product : {
                type : ObjectId,
                ref : "Product",
                required : true
            }
        }
    ],
    orderBy : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    paymentInfo : {
        id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        }
    },
    paidAt : {
        type : Date,
        required : true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },

    deliveredAt: Date,

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Order', OrderSchema)