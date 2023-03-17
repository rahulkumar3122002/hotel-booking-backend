const mongoose = require("mongoose");
const secondcardpay = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  card_number: {
    type: Number,
    length: 16,
    unique: true,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
  cvc_or_cvv_no: {
    type: Number,
    length: 3,
    required: true,
  },
});

const secondcardpaymodel = mongoose.model("secondroompaydata", secondcardpay);
module.exports = secondcardpaymodel;
