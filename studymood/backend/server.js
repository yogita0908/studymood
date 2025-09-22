import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000", // dev
    "https://studymood-yogita-kasotia.netlify.app" // production
  ],
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("StudyMood Backend Running 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error: ", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
