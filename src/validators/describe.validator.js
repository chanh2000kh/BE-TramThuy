const joi = require('@hapi/joi');

const schemas = {
    addDescribe: joi.object().keys({
        describeName: joi.string().required(),
        listDescribe: joi.array(),
    }),
    editDescribe: joi.object().keys({
        id: joi.string().required(),
        describeName: joi.string(),
        listDescribe: joi.array(),
    }),
};
module.exports = schemas;