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

// CORS configuration - FIXED
app.use(cors({
  origin: [
    "https://mern-saas-project-frontend.vercel.app",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"]
}));

// Handle preflight requests - FIXED (remove the problematic line)
// The cors middleware already handles OPTIONS requests automatically

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    status: "active",
    frontend: "https://mern-saas-project-frontend.vercel.app"
  });
});

// Test route specifically for frontend
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Backend is connected to frontend!",
    frontend: "mern-saas-project-frontend.vercel.app"
  });
});

// Add this to your index.js for better debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  console.log('User-Agent:', req.headers['user-agent']);
  next();
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
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    console.log("Server configured successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

startServer();

// Export for Vercel serverless
export default app;