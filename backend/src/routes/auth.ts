import express, { Request, Response, Router } from "express";
import authMiddleware from "../middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { doubleCsrfProtection } from "../middleware/csrf-token";
import User from "../models/User";
import { compareSync } from "bcrypt-ts";
dotenv.config();

const authRoutes: Router = express.Router();

// Login
authRoutes.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: { $eq: username } });
  if (user) {
    if (compareSync(password, user.password)) {      
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production" ? true : false,
          sameSite: process.env.NODE_ENV == "production" ? "strict" : "lax",
          maxAge: 3600000,
        })
        .json({ token });
      return;
    }

    res.status(401).json({ error: "Credenziali non valide" });
  }

  res.status(401).json({ error: "Utente Inesistente" });
  return;
});

authRoutes.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json({ id: req.user?.id, isAdmin: req.user?.isAdmin });
  return;
});

authRoutes.use(doubleCsrfProtection);
authRoutes.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token").clearCookie("Host-me-x-csrf-token");
  res.json({ message: "Logout riuscito" });
});

export default authRoutes;
