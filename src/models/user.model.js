import { Schema } from "mongoose";
import { db } from "./db.js";

const userSchema = new Schema({
  username: String,
  password: String
});

export const User = db.model('user', userSchema);