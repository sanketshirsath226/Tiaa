const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message : {
    type : String,
  },
  category :{
    type : String
  }
});

module.exports = mongoose.model("Messages", messageSchema);
