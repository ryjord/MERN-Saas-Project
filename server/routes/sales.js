// Imports
import express from "express";
import { getSales } from "../controllers/sales.js";

// initialise router
const router = express.Router();

// define routes
router.get("/sales", getSales);

// export router
export default router;