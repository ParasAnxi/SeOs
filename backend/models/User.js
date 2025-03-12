//** IMPORTS */
import mongoose from "mongoose";
import { Schema } from "mongoose";

//** USER */
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);
export default User;