const express = require("express");
const app = new express.Router();
const Schema = require("../model/schema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const otp = Math.floor(10000 + Math.random() * 90000);
const jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.email_password,
  },
});

const tkn_midlware = (req, res, next) => {
  try {
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
      return res.json({ isValid: false, message: "Not Authorize." });
    }
    jwt.verify(jwtToken.split(" ")[1], process.env.token_secret_key);
  } catch (err) {
    return res.json(err.message);
  }

  next();
};

app.post("/register", async (req, res) => {
  console.log("req :::", req.body);
  const data = new Schema(req.body);

  data.password = await bcrypt.hash(data.password, 10);
  await data
    .save()
    .then((result) => {
      console.log(".....", result);
      res.json({ isValid: true, message: "registration successfully....." });
    })
    .catch((error) => {
      res.json({ isValid: false, message: error.message });
    });
});

app.get("/get_data", tkn_midlware, async (req, res) => {
  try {
    await Schema.find()
      .then((result) => {
        console.log("result.....", result);
        return res.json({ isValid: true, message: result });
      })
      .catch((error) => {
        console.log("error.....", error);
        return res.json({ isValid: false, message: error.message });
      });
  } catch (error) {
    console.log("middleware error.....", error);
  }
});

app.delete("/delete_data/:id", async (req, res) => {
  await Schema.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      return res.json({ isValid: true, message: "data delete successfully." });
    })
    .catch((error) => {
      return res.json({ isValid: false, message: error.message });
    });
});

app.post("/update_data/:id", async (req, res) => {
  const update_name = req.body.name;
  const update_password = req.body.password;
  const update_address = req.body.address;
  const update_password_bcrypt = update_password
    ? await bcrypt.hash(update_password, 10)
    : Schema.password;

  Schema.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: update_name,
        password: update_password_bcrypt,
        address: update_address,
      },
    }
  )
    .then((result) => {
      console.log("update_data.....", result);
      Schema.findById({ _id: req.params.id })
        .then((result) => {
          return res.json({
            isValid: true,
            message: "data update successfully.....",
          });
        })
        .catch((error) => {
          console.log("update_data_error.....", error);
          return res.json({ isValid: false, message: error.message });
        });
    })
    .catch((error) => {
      console.log("update_data_error.....", error);
      return res.json({ isValid: false, message: error.message });
    });
});

app.post("/login", async (req, res) => {
  const body_login_email = req.body.email;
  const body_login_password = req.body.password;

  await Schema.findOne({ email: body_login_email })
    .then(async (result) => {
      const compare_password = await bcrypt.compare(
        body_login_password,
        result.password
      );

      if (
        body_login_email == null ||
        body_login_email != result.email ||
        body_login_password == null ||
        !compare_password
      ) {
        res.json({
          isValid: false,
          message: "please check login details......",
        });
      } else {
        const tkn_id = result.id;
        const login_token = jwt.sign(tkn_id, process.env.token_secret_key);
        return res.json({
          isValid: true,
          message: "login successfull......",
          login_token,
          result,
        });
      }
    })
    .catch((error) => {
      res.json({
        isValid: false,
        message: "please cheack error....." + error.message,
      });
    });
});

app.post("/verify", async (req, res) => {
  const check_otp = req.body.otp;
  if (check_otp === null || otp != check_otp) {
    res.json({ isValid: false, message: "not verify " });
  } else {
    res.json({ isValid: true, message: " verify successfull....." });
  }
});

app.post("/forgot_password", async (req, res) => {
  const forgot_pass_email = req.body.email;
  await Schema.findOne({ email: forgot_pass_email })
    .then((result) => {
      if (forgot_pass_email === null || result === null) {
        return res.json({
          isValid: false,
          message: "please enter details.....",
        });
      } else {
        const maildetails = {
          from: process.env.email,
          to: forgot_pass_email,
          subject: "Otp for change your password.....",
          text: `${otp}`,
        };
        transport.sendMail(maildetails, (error, info) => {
          if (error) {
            console.log("email error.....", error);
          } else {
            console.log("email send.....", info.response);
          }
        });
        console.log(".....", result);
        res.json({ isValid: true, message: "check email....." });
      }
    })
    .catch((error) => {
      console.log("error.....", error);
      res.json({ isValid: false, message: error.message });
    });
});

app.post("/setpassword", async (req, res) => {
  const set_pass_email = req.body.email;
  const set_pass = await bcrypt.hash(req.body.password, 10);
  await Schema.findOneAndUpdate(
    { email: set_pass_email },
    {
      $set: {
        password: set_pass,
      },
    }
  )
    .then((result) => {
      console.log("set password.....", result);
      res.json({ isValid: true, message: "password set successfull....." });
    })
    .catch((error) => {
      console.log("error.....", error);
      res.json({ isValid: false, message: error.message });
    });
});

app.post("/tkn_vrfy", tkn_midlware, (req, res) => {
  try {
    return res.json({ isValid: true, message: "valid....." });
  } catch (error) {
    return res.json({ isValid: true, message: error });
  }
});

module.exports = app;
