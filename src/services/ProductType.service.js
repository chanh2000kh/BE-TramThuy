const productType = require('../models/ProductType.model')

exports.getOneProductTypeAsync = async (id) => {
    try {
        const type = await productType.findById({ _id: id });
        return {
            message: 'Successfully Get One Product Type',
            success: true,
            data: type
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllProductTypeAsync = async body => {
    try {
        const { skip, limit } = body;

        const type = await productType.find().sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        return {
            message: 'Successfully Get All Product Type',
            success: true,
            data: type
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.createProductTypeAsync = async body => {
    try {
        const { name, describe } = body

        //check name is already in the database
        const nameExist = await productType.findOne({
            name: name
        })
        if (nameExist)
            return {
                message: 'Type name already exists',
                cuccess: false
            };
        const newProductType = new productType({
            name: name,
            describe: describe
        });
        await newProductType.save();
        return {
            message: "Successfully create a product type",
            success: true,
            data: newProductType
        }
    } catch (error) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
}
exports.updateProductTypeAsync = async body => {
    try {
        const { id, name, describe } = body

        //check name is already in the database
        const type = await productType.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
            )
        return {
            message: 'Successfully Update Product Type',
            success: true,
            data: type
        };
    } catch (error) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
}