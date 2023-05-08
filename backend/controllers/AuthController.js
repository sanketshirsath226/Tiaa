import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {genrateOtp} from "../utils/otpUtils.js";
import OtpModel from "../models/OtpModel.js";
import {sendMail} from "../utils/otpUtils.js";
import mongoose from "mongoose";
// Register new user
export const registerUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const {username,email} = req.body
  try {
    // addition new
    let oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    oldUser = await UserModel.findOne({email})

    if (oldUser)
      return res.status(400).json({ message: "Email already exists" });
      
    // changed
    const user = await newUser.save();
    const otp = genrateOtp();
    console.log(otp)
    const otpModel = new OtpModel(  {
      // _id: new mongoose.Types.ObjectId(),
      value: otp.toString(),
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    if(!otpModel){
      console.log("Otp Model Error")
    }
    // await otpModel.save();

    await sendMail(
      user.email,
      "Verfication",
      `Otp For Registration Is : ${otp}`
    );
    const token = jwt.sign(
      { username: user.username,email : user.email, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Login User

export const otpValidate = async (req,res) =>{
  const { email, otp } = req.body;
  try {
    const otpValue = await OtpModel.findOne({ email:email });

    if (otpValue) {
      const validity = (otpValue.value === otp)
      console.log(validity)
      if (!validity) {
        res.status(400).json("wrong otp");
      } else {
        await UserModel.updateOne(
          {
            email : email
        },{
            $set : {
                isValid : true
            }
        });
        res.status(200).json("Post updated!");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Changed
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      // if(user.isBlock){
      //   return  res.status(400).json("Your Blocked. Please Contact Admin...");
      // }
      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username,email : user.email, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};