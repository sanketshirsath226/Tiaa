import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    ref: "PostMessage",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const CommentModel = mongoose.model("Comments", commentSchema);
export default CommentModel;