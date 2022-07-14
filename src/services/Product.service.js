const Product = require('../models/Product.model')
exports.createProductAsync = async body => {
    try {
        const newProduct = new Product(body);
        await newProduct.save();
        return {
            message: "Successfully create a product",
            success: true,
            data: newProduct
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'An error occurred',
            success: false
        };
    }
}

exports.updateProductAsync = async body => {
    console.log(body)
    try {
        const product = await Product.findOneAndUpdate(
            { _id: body.id },
            body,
            {
                new: true
            }
        )

        return {
            message: "Successfully update a product",
            success: true,
            data: product
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'An error occurred',
            success: false
        };
    }
}