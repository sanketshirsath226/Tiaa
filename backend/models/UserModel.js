import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isValid : {
      type : Boolean,
      require : true,
      default : false,
    },
    isBlock : {
      type : Boolean,
      require : true,
      default : false,
    },
    createdAt: Date,
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  });

  const UserModel = mongoose.model("Users", UserSchema);
  export default UserModel;