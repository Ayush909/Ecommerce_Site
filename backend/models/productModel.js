const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please Enter Product Name."],
        trim : true
    },
    description : {
        type : String,
        required: [true,"Please Enter Product Description."]
    },
    price : {
        type : Number,
        required : [true,"Please Enter Product price."],
        maxLength: [8,"Price can exceed 8 figures."]
    },
    rating : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true,"Please enter product category"]
    },
    Stock : {
        type : Number,
        required : [true,"Please Enter Product Instock"],
        maxLength : [4,"Stock cannot exceed 4 digits"],
        default : 1
    },
    numberOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    createdBy : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model("Product",ProductSchema);