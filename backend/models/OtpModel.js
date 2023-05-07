import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  value: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: Date,
});

const UserModel = mongoose.model("Otp", OtpSchema);
export default UserModel;