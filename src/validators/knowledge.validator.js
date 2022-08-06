const joi = require('@hapi/joi');

const schemas = {
    createKnowledge: joi.object().keys({
        name: joi.string().required(),
        describe: joi.string(),
        img: joi.array(),
        detail: joi.string(),
        author: joi.string(),
        tag: joi.string(),
    })
};
module.exports = schemas;