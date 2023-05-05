const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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
