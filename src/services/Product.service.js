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

exports.getAllProductAsync = async body => {
    try {
        const { skip, limit } = body;

        const product = await Product.find().sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        return {
            message: 'Successfully Get All Product',
            success: true,
            data: product
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllProductByTypeIdAsync = async body => {
    try {
        const { skip, limit, productTypeId, tag, min, max } = body;
        if(tag == 0)
        {
            const product = await Product.find({productTypeId: productTypeId, price: { $gte: min, $lte: max}}).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
            return {
                message: 'Successfully Get All Product By Type Id',
                success: true,
                data: product
            };
        }
        else
        {
            const product = await Product.find({productTypeId: productTypeId, tag: tag, price: { $gte: min, $lte: max}}).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
            return {
                message: 'Successfully Get All Product By Type Id',
                success: true,
                data: product
            };
        }        
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getOneProductAsync = async body => {
    try {
        const { id } = body;

        const product = await Product.findOne({_id: id})
        if(product == null)
        {
            return {
                message: 'This product was not found',
                success: false,
                data: []
            };
        }
        return {
            message: 'Successfully Get One Product',
            success: true,
            data: product
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};