import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import apiRouter from "./routes/api";
import authRoutes from "./routes/auth";
import tripRoutes from "./routes/trips";
import categoriesRoutes from "./routes/categories";

const app = express();

const corsArray = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: corsArray,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
if (process.env.NODE_ENV == "production") {
  app.use("/auth", authRoutes);
  app.use("/trips", tripRoutes);
  app.use("/categories", categoriesRoutes);
} else {
  app.use(`/api`, apiRouter);
}

mongoose
  .connect(process.env.MONGO_URI || "", {} as mongoose.ConnectOptions)
  .then(() => console.log("🟢 Connessione a MongoDB riuscita"))
  .catch((err) => console.error("🔴 Errore connessione MongoDB", err));

app.listen(3000, () => {
  console.log("🚀 Backend in ascolto su porta 3000");
});
