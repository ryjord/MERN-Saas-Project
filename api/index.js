import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Import routes
import clientRoutes from "../server/routes/client.js";
import generalRoutes from "../server/routes/general.js";
import managementRoutes from "../server/routes/management.js";
import salesRoutes from "../server/routes/sales.js";

// Configurations
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes Setup
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "API is running!",
    timestamp: new Date().toISOString(),
    status: "active"
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

connectDB();

// Export as serverless function
export default app;