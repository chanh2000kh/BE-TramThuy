const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const { defaultModel } = require('../config/defineModel')

const reviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    star: defaultModel.number,
    email: defaultModel.stringR,
    name: defaultModel.stringR,
    writeReview: defaultModel.string,
    verify: defaultModel.number,
    img: defaultModel.stringImage,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('reviews', reviewSchema)