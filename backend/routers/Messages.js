const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const messageDB = require("../models/Messages");
const isAuthenticated = require("../controller/requestAuthenticator");
const Answers = require("../models/Messages");
router.post("/", async (req, res) => {
  console.log(req.body.userDetails);
  console.log(typeof req.body.userDetails);
  try {
    await messageDB
      .create({
        userId: req.body.userId,
        message: req.body.message,
        category: req.body.category,
      })
      .then(() => {
        res.status(201).send({
          message: "Message added successfully",
          status: true,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
          status: false,
        });
      });

  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});


