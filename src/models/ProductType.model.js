const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const { defaultModel } = require('../config/defineModel')

const ProductTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    describe: defaultModel.string,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('productTypes', ProductTypeSchema)