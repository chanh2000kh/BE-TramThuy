const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const { defaultModel } = require("../config/defineModel");

const Bill = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: defaultModel.string,
  address: defaultModel.string,
  ZIPcode: defaultModel.string,
  provinceCity: defaultModel.string,
  country: defaultModel.string,
  phone: defaultModel.stringPhone,
  email: defaultModel.string,
  note: defaultModel.string,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  totalMoneyBill: defaultModel.number,
  status: defaultModel.number,
  payOnline: defaultModel.booleanFalse,
  paid: defaultModel.booleanFalse,
  discountCode: defaultModel.string,
  products: defaultModel.array
});
module.exports = mongoose.model("Bills", Bill);
