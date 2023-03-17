const express = require("express");
const app = new express.Router();
const schema = require("../model/deluxeroom");

app.post("/dlroom_register", async (req, res) => {
  await schema
    .find({
      roomNo: req.body.roomNo,
      checkInDate: req.body.checkInDate,
    })
    .then(async (result) => {
      if (result.length === 1) {
        console.log("result.....", result);
        return res.json({
          isValid: false,
          message: "room is already book.....",
        });
      } else {
        const data = new schema(req.body);
        await data
          .save()
          .then(async (result) => {
            return res.json({
              isValid: true,
              message: "room is book successfully.....",
            });
          })
          .catch((error) => {
            return res.json({ isValid: false, message: "try again....." });
          });
      }
    })
    .catch((error) => {
      console.log("error.....", error);
    });
});

app.get("/dlroom_data", async (req, res) => {
  await schema
    .find()
    .then((result) => {
      console.log("result.....", result);
      return res.json({ isValid: true, message: result });
    })
    .catch((error) => {
      console.log("error.....", error);
      return res.json({ isValid: false, message: error });
    });
});

app.post("/dlroom_update/:id", async (req, res) => {
  const params_id = req.params.id;
  const updt_email = req.body.email;
  const updt_person = req.body.person;
  const updt_roomNo = req.body.roomNo;
  const updt_roomType = req.body.roomType;
  const updt_checkInDate = req.body.checkInDate;
  const updt_checkOutDate = req.body.checkOutDate;

  await schema
    .find({
      roomNo: updt_roomNo,
      checkInDate: updt_checkInDate,
    })
    .then(async (result) => {
      console.log("result.....", result);
      console.log("result.....", result.length);
      if (result.length === 1) {
        return res.json({
          isValid: false,
          message: "this room is already book.....",
        });
      } else {
        await schema
          .findByIdAndUpdate(
            { _id: params_id },
            {
              $set: {
                email: updt_email,
                person: updt_person,
                roomNo: updt_roomNo,
                roomType: updt_roomType,
                checkInDate: updt_checkInDate,
                checkOutDate: updt_checkOutDate,
              },
            }
          )
          .then((result) => {
            console.log("old result.....", result);
            schema
              .findById({ _id: req.params.id })
              .then((result) => {
                console.log("new result.....", result);
                return res.json({
                  isValid: true,
                  message: "data update successfull.....",
                });
              })
              .catch((error) => {
                return res.json({ isValid: true, message: error });
              });
          })
          .catch((error) => {
            return res.json({
              isValid: false,
              message: "data in no update.....",
            });
          });
      }
    })
    .catch((error) => {
      console.log("error.....", error);
      return res.json({ isValid: false, message: "try again....." });
    });
});

app.delete("/dlroom_delete/:id", async (req, res) => {
  await schema
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      console.log("result.....", result);
      return res.json({ isValid: true, messagr: result });
    })
    .catch((error) => {
      console.log("error.....", error);
      return res.json({ isValid: false, messagr: error });
    });
});

module.exports = app;
