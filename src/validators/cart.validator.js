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
};
module.exports = schemas;