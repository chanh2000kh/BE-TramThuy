const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const { defaultModel } = require("../config/defineModel");

const DiscountCode = new Schema({
    name: defaultModel.string,
    code: defaultModel.stringR,
    describe: defaultModel.string,
    startDay: defaultModel.date,
    endDay: defaultModel.date,
    numberOfRemain: {
        type: Number,
        required: true,
        default: 0
    },
    numberOfUsed: {
        type: Number,
        default: 0
    },
    maximumDiscount: defaultModel.number,
    minimumOrder: defaultModel.number,
    discountStyle: defaultModel.number,
    discountPercent: defaultModel.number,
    productTypeCanUse : {
        type: Schema.Types.ObjectId,
        ref: 'productTypes'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

});
module.exports = mongoose.model("DiscountCodes", DiscountCode);