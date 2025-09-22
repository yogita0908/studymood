// Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  focusScore: { type: Number, required: true }, // 0–10 score
  sessionType: { type: String, enum: ["micro", "deep"], required: true }, // adaptive
  duration: { type: Number, required: true }, // minutes
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
