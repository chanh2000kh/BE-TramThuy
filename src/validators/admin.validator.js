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
    // updateUser: joi.object().keys({
    //     id: joi.string().required(),
    //     email: joi.string().allow(''),
    //     password: joi.string().allow(''),
    //     phone: joi.string(),
    //     name: joi.string(),
    //     address: joi.string(),
    //     verify: joi.boolean(),
    // }),
};
module.exports = schemas;
