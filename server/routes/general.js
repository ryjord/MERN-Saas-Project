// imports
import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";

// set up router
const router = express.Router();

// Route definitions
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

// main export
export default router;