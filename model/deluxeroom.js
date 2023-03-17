const mongoose = require("mongoose");
const deluxeroom = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    default: "deluxe room",
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
const deluxeroommodel = mongoose.model("deluxeroomdata", deluxeroom);
module.exports = deluxeroommodel;
