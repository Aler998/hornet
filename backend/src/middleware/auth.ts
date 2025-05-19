import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

interface UserPayload {
  username: string;
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.token;

  if (!token) {
    res.status(403).json({ error: "Token mancante" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET) as UserPayload;
    req.user = decoded;
    next();
    return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(403).json({ error: "Token non valido" });
    return;
  }
}

export default authMiddleware;
