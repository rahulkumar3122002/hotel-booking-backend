const mongoose = require("mongoose");
const firstcardpay = new mongoose.Schema({
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
    required: true,
    length: 3,
  },
});

const firstcardpaymodel = mongoose.model("firstroompaydata", firstcardpay);
module.exports = firstcardpaymodel;
