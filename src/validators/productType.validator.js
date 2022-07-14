const joi = require('@hapi/joi');

const schemas = {
    createProductType: joi.object().keys({
        name: joi.string().required(),
        describe: joi.string().required(),
    }),
    updateProductType: joi.object().keys({
        id: joi.string().required(),
        name: joi.string().required(),
        describe: joi.string().required(),
    }),
};
module.exports = schemas;