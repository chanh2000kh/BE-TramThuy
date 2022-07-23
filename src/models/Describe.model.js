const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const { defaultModel } = require("../config/defineModel");

const Describe = new Schema({
    describeName: defaultModel.stringR,
    listDescribe: defaultModel.array, //[{name, detail}]
});
module.exports = mongoose.model("Describes", Describe);