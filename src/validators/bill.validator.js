const joi = require('@hapi/joi');

const schemas = {
    createBill: joi.object().keys({
        name: joi.string().required(),
        address: joi.string().required(),
        ZIPcode: joi.string().allow(""),
        provinceCity: joi.string().required(),
        country: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().required(),
        note: joi.string().allow(""),
        discountCode: joi.string().allow(""),
        payOnline: joi.bool(),
        totalMoneyBill: joi.number(),
        products : joi.array(),
        //products: [{idproduct, amount, totalMoney}]
    }),
    getBill: joi.object().keys({
    }),
    createBillHaventToken: joi.object().keys({
        name: joi.string().required(),
        address: joi.string().required(),
        ZIPcode: joi.string().allow(""),
        provinceCity: joi.string().required(),
        country: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().required(),
        note: joi.string().allow(""),
        discountCode: joi.string().allow(""),
        payOnline: joi.bool(),
        totalMoneyBill: joi.number(),
        products : joi.array(),
        //products: [{idproduct, amount, totalMoney}]
    }),
};
module.exports = schemas;