const joi = require('@hapi/joi');
const schemas = {
    createProduct: joi.object().keys({
        name: joi.string().required(),
        price: joi.number().required(),
        img: joi.array(),
        numberOfRemain: joi.number(),
        meaningful: joi.string(),
        material: joi.string(), 
        source: joi.string(),
        numberOfSeeds: joi.string(),
        age: joi.string(),
        use: joi.string(),
        productTypeId: joi.string().required(),
        tag: joi.number()
    }),
};
module.exports = schemas;