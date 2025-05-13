import express, { Request, Response, Router } from "express";
import authMiddleware from "../middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authRoutes: Router = express.Router();

// Login
authRoutes.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({ token });
  }

  res.status(401).json({ error: "Credenziali non valide" });
});

authRoutes.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout riuscito" });
});

authRoutes.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json({ email: req.user?.username });
});

export default authRoutes;
