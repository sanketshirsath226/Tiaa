const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const messageDB = require("../models/Messages");
const isAuthenticated = require("../controller/requestAuthenticator");
const Messages = require("../models/Messages");
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

// Get all message
app.get('/messages', async (req, res) => {
  try {
    const message = await Messages.find({});
    res.send(message);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Update a message by ID
app.patch('/messages/:id', async (req, res) => {
  try {
    const message = await Messages.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.send(message);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a message by ID
app.delete('/messages/:id', async (req, res) => {
  try {
    const message = await Messages.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).send('Message not found');
    }
    res.send(message);
  } catch (err) {
    res.status(500).send(err);
  }
});

