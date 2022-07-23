const joi = require('@hapi/joi');

const schemas = {
    addCart: joi.object().keys({
        idProduct: joi.string().required(),
        amount: joi.number().required(),
    }),
    updateCart: joi.object().keys({
        idProduct: joi.string().required(),
        amount: joi.string().required(),
    }),
    deleteCart: joi.object().keys({
        idProduct: joi.string().required(),
    }),
    getCart: joi.object().keys({
    }),
    getCartHaventToken: joi.object().keys({
        listCart: joi.array()
    }),
};
module.exports = schemas;