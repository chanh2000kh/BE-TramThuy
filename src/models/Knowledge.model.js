const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const { defaultModel } = require('../config/defineModel')

const Knowledge = new Schema({
    name: defaultModel.string,
    detail: defaultModel.string,
    author: defaultModel.string,
    tag: defaultModel.string,
    img: defaultModel.array,
    describe: defaultModel.string,
    view: defaultModel.number,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('Knowledges', Knowledge)