const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // each comment can only relates to one blog, so it's not in array
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Comment", commentSchema);