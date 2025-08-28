import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateOTP } from '../utils/otp';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { verifyGoogleToken } from '../utils/googleOAuth';
import dotenv from 'dotenv'
dotenv.config()


// This is use only real gmail mail sender 
const transporter = nodemailer.createTransport({
  host:"ranabusiness@fitzon.com",
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });



export const signupEmail = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || !name) return res.status(400).json({ message: 'Email and name required' });
  try {
    let user = await User.findOne({ email });
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (!user) {
      user = new User({ email, name, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.name = name;
    }
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It expires in 5 minutes. Don't share it`,
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User  not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (!user.otpExpiry || user.otpExpiry < new Date()) return res.status(400).json({ message: 'OTP expired' });

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).json({ token, user: { email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const googleLogin = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: 'idToken is required' });

  try {
    const payload = await verifyGoogleToken(idToken);

    // payload contains email, name, sub (Google user ID), etc.
    if (!payload.email) return res.status(400).json({ message: 'Email not found in token' });

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        email: payload.email,
        googleId: payload.sub,
        name: payload.name || 'Google User',
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).json({ token, user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({ message: 'Invalid Google token' });
  }
};
