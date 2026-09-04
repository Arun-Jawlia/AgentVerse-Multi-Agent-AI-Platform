import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

app.use("/", AuthRouter);

app.get("/health", (req, res) => {
  res.json({ msg: "Auth Service", health: "OK" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Auth Service is running on ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
