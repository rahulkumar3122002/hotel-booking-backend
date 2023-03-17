const express = require("express");
const app = new express.Router();
const deluxeRoom_pay = require("../model/deluxeroompay");

app.post("/deluxe_pay_amount", async (req, res) => {
  const deluxeRoom_pay_body_data = new deluxeRoom_pay(req.body);
  await deluxeRoom_pay_body_data
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

app.get("/deluxe_paydata", async (req, res) => {
  await deluxeRoom_pay
    .find()
    .then((result) => {
      return res.json({ isValid: true, message: result });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: "please try again....." });
    });
});

app.delete("/deluxe_paydata_delete/:id", async (req, res) => {
  await deluxeRoom_pay
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
