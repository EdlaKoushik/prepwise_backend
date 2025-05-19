import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authroute.js";
import intgenroute from "./routes/intgenroute.js"
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/vapi/generate",intgenroute);
app.get("/", (req, res) => {
  res.json({ "message": "Server koushik  running !" });
});

const PORT = 5001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB().catch(err => console.log("MongoDB connection error:", err));
});