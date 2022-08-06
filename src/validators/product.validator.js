const joi = require('@hapi/joi');
const schemas = {
    createProduct: joi.object().keys({
        name: joi.string().required(),
        price: joi.number().required(),
        img: joi.array(),
        numberOfRemain: joi.number(),
        productTypeId: joi.string().required(),
        tag: joi.number(),
        type: joi.array(),
        size: joi.array(),
        detailProduct: joi.string(),
        listDescribeId: joi.array(),
    }),
    productByTypeId1: joi.object().keys({
        tag: joi.array(),
    }),
};
module.exports = schemas;