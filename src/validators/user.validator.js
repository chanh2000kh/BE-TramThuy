const joi = require("@hapi/joi");

const schemas = {
  createUser: joi.object().keys({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
  }),
  loginUser: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
  loginGoogle: joi.object().keys({
    email: joi.string().required(),
    name: joi.string().required(),
  }),
  editProfile: joi.object().keys({
    name: joi.string(),
    address: joi.string(),
    phone: joi.string().allow(""),
    ZIPcode: joi.string().allow(""),
    provinceCity: joi.string().allow(""),
    country: joi.string().allow(""),
  }),
  resetPassword: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
    otp: joi.string().required(),
  }),
  verifyUser: joi.object().keys({
    email: joi.string().required(),
    otp: joi.string().required(),
  }),
  changePass: joi.object().keys({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  }),
  registerByEmail: joi.object().keys({
    email: joi.string().required(),
  }),
};
module.exports = schemas;
