const express = require("express");
const app = new express.Router();
const first_Pay_Schema = require("../model/firstcardpay");

app.post("/first_room_pay_amount", async (req, res) => {
  const first_room_pay_data = new first_Pay_Schema(req.body);
  await first_room_pay_data
    .save()
    .then((result) => {
      console.log("result.....", result);
      return res.json({
        isValid: true,
        message: "amount pay successfully.....",
      });
    })
    .catch((error) => {
      console.log("error.....", error);
      return res.json({ isValid: false, message: "please try again....." });
    });
});

app.get("/first_room_data", async (req, res) => {
  await first_Pay_Schema
    .find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: "please try again....." });
    });
});

app.delete("/delete_first_room_data/:id", async (req, res) => {
  await first_Pay_Schema
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      console.log("result.....", result);
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
