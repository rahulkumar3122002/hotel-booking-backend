const mongoose = require("mongoose");
const firstroomSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  person: {
    type: String,
    min: 1,
    max: 4,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    default: "5star room",
    required: true,
  },

  checkInDate: {
    type: String,
    required: true,
  },

  checkOutDate: {
    type: String,
    required: true,
  },
});

const firstroom_model = mongoose.model("firstroomdata", firstroomSchema);
module.exports = firstroom_model;
