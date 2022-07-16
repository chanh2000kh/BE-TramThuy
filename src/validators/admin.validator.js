const joi = require('@hapi/joi');

const schemas = {
    createUser: joi.object().keys({
        username: joi.string().required(),
        password: joi.string().required(),
    }),
    loginUser: joi.object().keys({
        username: joi.string().required(),
        password: joi.string().required(),
    }),
};
module.exports = schemas;
