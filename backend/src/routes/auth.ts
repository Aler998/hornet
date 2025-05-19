import express, { Request, Response, Router } from "express";
import authMiddleware from "../middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { doubleCsrfProtection } from "../middleware/csrf-token";
dotenv.config();

const authRoutes: Router = express.Router();

// Login
authRoutes.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        sameSite: process.env.NODE_ENV == "production" ? "strict": "lax",
        maxAge: 3600000,
      })
      .json({ token });
    return;
  }

  res.status(401).json({ error: "Credenziali non valide" });
  return;
});

authRoutes.post(
  "/logout",
  doubleCsrfProtection,
  (_req: Request, res: Response) => {
    res.clearCookie("token").clearCookie("Host-me-x-csrf-token");
    res.json({ message: "Logout riuscito" });
  }
);

authRoutes.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json({ email: req.user?.username });
  return;
});

export default authRoutes;
