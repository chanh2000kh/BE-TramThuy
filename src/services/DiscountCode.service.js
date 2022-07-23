const DiscountCode = require('../models/DiscountCode.model');

exports.addDiscountCodeAsync = async body => {
    try {
        const discountCode = await DiscountCode.findOne({code: body.code})
        if(discountCode)
        {
            return {
                message: 'Discount Code already exists',
                success: false,
                data: [],
            };
        }
        const newDiscountCode = new DiscountCode(body)
        await newDiscountCode.save()
        return {
            message: 'Successfully Create Discount Code',
            success: true,
            data: newDiscountCode,
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.editDiscountCodeAsync = async body => {
    try {
        const discountCode = await DiscountCode.findOneAndUpdate({code: body.code}, body, { new: true })
        if(!discountCode)
        {
            return {
                message: 'Discount Code already exists',
                success: false,
                data: [],
            };
        }
        return {
            message: 'Successfully Edit Discount Code',
            success: true,
            data: discountCode,
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};