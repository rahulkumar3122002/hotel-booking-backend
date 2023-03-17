const mongoose = require("mongoose");
const LoginDt = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginModel = mongoose.model("logindata", LoginDt);
module.exports = loginModel;
