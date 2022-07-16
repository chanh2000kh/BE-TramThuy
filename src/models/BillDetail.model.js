const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const { defaultModel } = require("../config/defineModel");

const BillDetail = new Schema({
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  idBill: {
    type: Schema.Types.ObjectId,
    ref: "Bills",
  },
  amount: defaultModel.number,
  totalMoney: defaultModel.number,
});
module.exports = mongoose.model("BillDetails", BillDetail);