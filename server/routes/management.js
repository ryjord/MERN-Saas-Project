// Imports
import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";

// initialize router
const router = express.Router();

// route definitions
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

// export router
export default router;