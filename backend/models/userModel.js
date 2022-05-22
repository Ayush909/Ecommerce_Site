const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter your name"],
        maxlength : [30,"Name cannot exceed 30 characters"],
        minlength : [4,"Name should be more than 4 characters"]
    },
    email : {
        type: String,
        required : [true,"Please enter your email"],
        unique : true,
        validate : [validator.isEmail,"Please enter a valid email"]
    },
    password : {
        type: String,
        required : [true,"Please enter your password"],
        minlength : [8,"Password should be greater than 8 characters"],
        select : false
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : "user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
})

UserSchema.post('save', function(doc,next){
    
    console.log('new user was created & saved', doc);
    next();
})

UserSchema.pre('save', async function(next){
    console.log(this.isModified('password'));
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User",UserSchema);