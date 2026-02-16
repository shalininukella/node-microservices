import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Auth DB connected"))
  .catch((err) => console.error(err));

app.use("/", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Auth service running on ${process.env.PORT}`),
);