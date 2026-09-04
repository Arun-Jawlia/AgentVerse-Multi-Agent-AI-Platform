import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AgentRoutes from "./routes/agent.route.js";
dotenv.config();

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

app.use("/", AgentRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json(err.data);
  }

  return res.status(500).json({message: `agent error ${error}`})
});

app.get("/health", (req, res) => {
  res.json({ msg: "Agent Service", health: "OK" });
});


const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Agent Service is running on ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
