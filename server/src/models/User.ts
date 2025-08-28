import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  googleId?: string;
  name: string;
  otp?: string;
  otpExpiry?: Date;
}

const userSchema = new Schema<IUser >({
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  name: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
});

export const User = model<IUser >('User ', userSchema);
