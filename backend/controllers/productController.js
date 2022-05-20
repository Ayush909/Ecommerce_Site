const Product = require('../models/productModel');

//Create Product
exports.createProduct = async (req,res,next) => {
    try{
        const product = await Product.create(req.body);

        res.status(201).json({
            success : true,
            product
        });
    }catch(e){
        res.status(400).json({e});
    }
}

//Get All products
exports.getAllProducts = async (req,res) => {

    try{
        const products = await Product.find();
        res.status(200).json({
            products
        })
    }catch(err){
        res.status(400).json({e});
    }

}

//Get single product details
exports.getProductDetails = async (req,res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }

    res.status(200).json({
        success : true,
        product
    })
}


//Update Products
exports.updateProduct = async (req,res,next) => {

    try{
        let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
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
        res.status(500).json({
            success: false,
            error: err
        })
    }

}

//Delete a product

exports.deleteProduct = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(500).json({
                success : false,
                message : "Product not found"
            })
        }

        await product.remove();

        res.status(200).json({
            success : true,
            message : "Product deleted successfully"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            error: err
        })
    }
}