import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import BillingRoutes from "./routes/billing.route.js";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/", BillingRoutes);

app.get("/health", (req, res) => {
  res.json({ msg: "Billing Service", health: "OK" });
});


const startServer = async () => {
  try {
    await connectDB();
    // await redis.flushall()
    app.listen(port, () => {
      console.log(`Billing Service is running on ${port}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer()
