import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Authrouter from "./routes/authroutes.js";
import Taskrouter from "./routes/taskroutes.js";
import User from "./models/User.js";

dotenv.config(); // Load .env

const app = express();

// Middlewares
app.use(express.json()); 
app.use(cors());
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use('/api/auth', Authrouter);
app.use('/api/tasks', Taskrouter);


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database connected");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
}


startServer();
