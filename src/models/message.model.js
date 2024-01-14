import { Schema, Types } from "mongoose";
import { db } from "./db.js";

const messageSchema = new Schema({
  message: String,
  date: Date,
  from: { type: Types.ObjectId, ref: 'users' },
  to: { type: Types.ObjectId, ref: 'users' },
});

export const Message = db.model('messages', messageSchema);