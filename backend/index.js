/// import packages
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
dotenv.config();
import connectDB from "./configuration/database.js";

const port = process.env.PORT || 5000;
connectDB();

const app = express();

// middlewares functions
app.use(express.json()); // middleware parses json data in the req body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoute);

app.listen(port, () => console.log(`server is running on port ${port}`));
