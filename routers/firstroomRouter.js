const express = require("express");
// const { schema } = require("../model/firstroommodel");
const app = new express();
const Schema_Amount = require("../model/firstroommodel");

app.post("/first_room", async (req, res) => {
  await Schema_Amount.find({
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
        const data = new Schema_Amount(req.body);
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

app.get("/first_room_getamountdata", async (req, res) => {
  await Schema_Amount.find()
    .then((result) => {
      res.json({ isValid: true, message: result });
    })
    .catch((error) => {
      res.json({ isValid: false, message: error });
    });
});

app.post("/first_room_updateamountdata/:id", async (req, res) => {
  const params_id = req.params.id;
  const updt_email = req.body.email;
  const updt_person = req.body.person;
  const updt_roomNo = req.body.roomNo;
  const updt_roomType = req.body.roomType;
  const updt_checkInDate = req.body.checkInDate;
  const updt_checkOutDate = req.body.checkOutDate;

  await Schema_Amount.find({
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
        await Schema_Amount.findByIdAndUpdate(
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
            Schema_Amount.findById({ _id: req.params.id })
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

app.delete("/first_room_deleteamountdata/:id", async (req, res) => {
  await Schema_Amount.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      return res.json({
        isValid: true,
        message: "data delete successfully.....",
      });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: error });
    });
});

module.exports = app;
