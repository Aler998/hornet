import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  profile: string;
  cover: string;
  isAdmin: boolean;
}

export const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },
    surname: { type: String, required: false },
    profile: { type: String, required: false },
    cover: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
