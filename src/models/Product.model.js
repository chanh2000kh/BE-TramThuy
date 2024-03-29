const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const { defaultModel } = require('../config/defineModel')
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: Array,
        default: []
    },
    star:{
        type: Number,
        default: 0
    },
    numberOfRemain: {
        type: Number,
        required: true,
        default: 0
    },
    numberOfSold: {
        type: Number,
        default: 0
    },
    numberOfReview: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    type: defaultModel.array,
    size: defaultModel.array,
    tag: {
        type: Number
    },
    productTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'productTypes'
    },
    detailProduct: defaultModel.string,
    listDescribeId: defaultModel.array,
})

module.exports = mongoose.model('products', ProductSchema)