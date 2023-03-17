const mongoose = require("mongoose");
const secondroomSchema = new mongoose.Schema({
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
    default: "7star room",
    required: true,
  },

  checkInDate: {
    type: String,
    required: true,
    min: Date.now(),
  },

  checkOutDate: {
    type: String,
    required: true,
  },
});

const secondroom_model = mongoose.model("secondroomdata", secondroomSchema);
module.exports = secondroom_model;
