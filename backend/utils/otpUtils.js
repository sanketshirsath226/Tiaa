import path from "path";
import nodemailer from 'nodemailer';

export const genrateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
    .toString()
    .padEnd(6);
}

export const sendMail = async (
  email,
  email_subject,
  email_content
) => {
  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD,
    },
    host: 'smtp.gmail.com',
    port: 465,
  });

 
  return await transporter.sendMail({
    from: process.env.MAILUSER,
    to: email,
    subject: email_subject,
    text:email_content
   
  });
};
