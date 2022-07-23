const joi = require('@hapi/joi');

const schemas = {
    addReview: joi.object().keys({
        productId: joi.string().required(),
        star: joi.number().required(),
        email: joi.string().required(),
        name: joi.string().required(),
        writeReview: joi.string().allow(""),
    }),
    verifyReview: joi.object().keys({
        reviewId: joi.string().required(),
        verify: joi.number().required(),
    }),
};
module.exports = schemas;