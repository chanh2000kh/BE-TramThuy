const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const { defaultModel } = require("../config/defineModel");

const Cart = new Schema({
  idUser: defaultModel.string,
  amount: defaultModel.number,
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
});
module.exports = mongoose.model("Cart", Cart);
