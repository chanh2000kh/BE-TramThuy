const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const { defaultModel } = require('../config/defineModel')
const UserSchema = new Schema({
    username: defaultModel.stringUnique,
    password: defaultModel.stringR,
    name: defaultModel.string,
    address: defaultModel.string,
    ZIPcode: defaultModel.string,
    provinceCity: defaultModel.string,
    country: defaultModel.string,
    phone: defaultModel.stringPhone,
    email: defaultModel.string,
    otp: defaultModel.string,
    verify: defaultModel.booleanFalse,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    role: defaultModel.number
})


module.exports = mongoose.model('users', UserSchema)