import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import AgentRoutes from "./routes/agent.route.js";
dotenv.config();

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/", AgentRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "This is Agent Service" });
});

const startServer = async () => {
  try {
    // await connectDB();
    app.listen(port, () => {
      console.log(`Agent Service is running on ${port}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer()
