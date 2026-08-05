import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors'
import mongoose, { mongo } from "mongoose";
import ChatRoutes from "./routes/chat.route.js";
dotenv.config();

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/", ChatRoutes)

app.get("/", (req, res) => {
  res.json({ msg: "This is Chat Service" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Chat Service is running on ${port}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer()
