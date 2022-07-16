const joi = require('@hapi/joi');

const schemas = {
    addDiscountCode: joi.object().keys({
        name: joi.string().allow(""),
        code: joi.string().required(),
        describe: joi.string().allow(""),
        startDay: joi.date(),
        endDay: joi.date(),
        numberOfRemain: joi.number(),
        maximumDiscount: joi.number(),
        minimumOrder: joi.number(),
        discountStyle: joi.number(),
        discountPercent: joi.number(),
        productTypeCanUse: joi.string().allow("")
    }),
};
module.exports = schemas;