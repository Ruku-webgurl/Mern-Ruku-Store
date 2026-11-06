import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables reliably from both api/.env and root .env
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config();

// Database
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Connect database
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Enable CORS for cross-origin requests & credentials
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// PayPal configuration
app.get("/api/config/paypal", (req, res) => {
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

// Ensure upload folders exist
const rootUploads = path.resolve(__dirname, "../uploads");
const apiUploads = path.resolve(__dirname, "uploads");

if (!fs.existsSync(rootUploads)) fs.mkdirSync(rootUploads, { recursive: true });
if (!fs.existsSync(apiUploads)) fs.mkdirSync(apiUploads, { recursive: true });

// Static uploads folders
app.use("/uploads", express.static(rootUploads));
app.use("/uploads", express.static(apiUploads));

// Serve Frontend in Production / on Render Web Service
const distPath = path.resolve(__dirname, "../dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Express 5 compatible SPA fallback
  app.use((req, res, next) => {
    if (
      (req.method === "GET" || req.method === "HEAD") &&
      !req.path.startsWith("/api") &&
      !req.path.startsWith("/uploads")
    ) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
    next();
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
