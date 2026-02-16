import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Product DB Connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Product running on ${process.env.PORT}`);
});
