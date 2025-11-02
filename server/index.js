// Import dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// import routes 
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

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

// Health check route - IMPORTANT!
app.get("/", (req, res) => {
  res.json({ 
    message: "API is running!",
    timestamp: new Date().toISOString(),
    status: "active"
  });
});

// Mongoose Setup
const PORT = process.env.PORT || 9000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");
    }
    
    // For Vercel, we need to export the app without listening
    // Vercel will handle the listening
    console.log("Server configured successfully");
  } catch (error) {
    console.log(`${error} did not connect`);
  }
};

startServer();

// Export for Vercel serverless
export default app;