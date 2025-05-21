import express, { Request, Response } from "express";
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
import rateLimit from "express-rate-limit";
import { generateCsrfToken } from "./middleware/csrf-token";
import todosRoutes from "./routes/todos";
import cron from "node-cron";
import { checkAndFetchFile } from "./services/FetchCostoBenzina";

cron.schedule("1 1 * * *", () => {
  console.log("Azione ogni 2 minuti");

  try {
    checkAndFetchFile();
  } catch (error) {
    console.error(error);
  }
});

const app = express();

const RateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

app.use(RateLimiter);

const corsArray = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: corsArray,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const getCsrfTokenRoute = (req: Request, res: Response) => {
  const csrfToken = generateCsrfToken(req, res);

  res
    .cookie("Host-me-x-csrf-token", csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV == "production" ? true : false,
      sameSite: process.env.NODE_ENV == "production" ? "strict" : "lax",
      maxAge: 3600000,
    })
    .json({ csrfToken });
};

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
if (process.env.NODE_ENV == "production") {
  app.use("/auth", authRoutes);
  app.use("/trips", tripRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/todos", todosRoutes);
  app.get("/csrf-token", getCsrfTokenRoute);
} else {
  app.use(`/api`, apiRouter);
  app.get("/api/csrf-token", getCsrfTokenRoute);
}

mongoose
  .connect(process.env.MONGO_URI || "", {} as mongoose.ConnectOptions)
  .then(() => console.log("🟢 Connessione a MongoDB riuscita"))
  .catch((err) => console.error("🔴 Errore connessione MongoDB", err));

app.listen(3000, () => {
  console.log("🚀 Backend in ascolto su porta 3000");
});
