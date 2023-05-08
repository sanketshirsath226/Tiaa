import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: {type: String, required : true},
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    category:{
      type : String,
      default : "other"
    },
    image: {
      type : String    
    },
    comments : [{
      comment : String,
      userId :{
        type : String
      },
      createdAt: {
        type: Date,
        default: new Date(),
      }
    }]
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;