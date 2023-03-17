const express = require("express");
const app = new express.Router();
const secondPaySchema = require("../model/secondcardpay");

app.post("/second_room_pay_amount", async (req, res) => {
  const second_room_data = new secondPaySchema(req.body);
  await second_room_data
    .save()
    .then((result) => {
      return res.json({
        isValid: true,
        message: "amount pay successfully.....",
      });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: "please try again....." });
    });
});

app.get("/second_room_data", async (req, res) => {
  await secondPaySchema
    .find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: "please try again....." });
    });
});

app.delete("/delete_second_room_data/:id", async (req, res) => {
  await secondPaySchema
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      return res.json({
        isValid: true,
        message: "data delete successfully.....",
      });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: "please try again....." });
    });
});

module.exports = app;
