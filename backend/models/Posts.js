const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  categories:String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", PostSchema);
