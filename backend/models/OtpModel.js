const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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