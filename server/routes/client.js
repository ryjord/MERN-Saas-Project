// Imports
import express from "express";
import {getProducts, getCustomers, getTransactions, getGeography,} from "../controllers/client.js";

// Set up router
const router = express.Router();

// route definitions
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

// Main export
export default router;