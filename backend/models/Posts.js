const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
  },
  upvotes: {
    type: [
      {
        "userId" : {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    required: true,
  },
  downvotes: {
    type: [
      {
        "userId" : {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
  ,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", PostSchema);
