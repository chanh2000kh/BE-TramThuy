const DiscountCode = require('../models/DiscountCode.model');

exports.addDiscountCodeAsync = async body => {
    try {
        const discountCode = new DiscountCode(body)
        await discountCode.save()
        return {
            message: 'Successfully Create Discount Code',
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