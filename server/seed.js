/**
 * One-off seed script.
 *
 * server/data/index.js holds the tutorial's sample dataset but nothing
 * imported it, so a fresh clone had 23,000 lines of fixtures and no way to get
 * them into a database. This loads them.
 *
 *   npm run seed
 *
 * Existing documents are left alone: each collection is skipped if it already
 * has records, so running this twice will not duplicate anything.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

dotenv.config();

const collections = [
  { name: "users", model: User, data: dataUser },
  { name: "products", model: Product, data: dataProduct },
  { name: "product stats", model: ProductStat, data: dataProductStat },
  { name: "transactions", model: Transaction, data: dataTransaction },
  { name: "overall stats", model: OverallStat, data: dataOverallStat },
  { name: "affiliate stats", model: AffiliateStat, data: dataAffiliateStat },
];

const seed = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected.");

  for (const { name, model, data } of collections) {
    const existing = await model.estimatedDocumentCount();
    if (existing > 0) {
      console.log(`Skipping ${name}: ${existing} documents already present.`);
      continue;
    }
    await model.insertMany(data);
    console.log(`Inserted ${data.length} ${name}.`);
  }

  await mongoose.disconnect();
  console.log("Done.");
};

seed().catch(async (error) => {
  console.error("Seeding failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
