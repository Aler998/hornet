import express, { Request, Response, Router } from "express";

import authMiddleware from "../middleware/auth";
import { doubleCsrfProtection } from "../middleware/csrf-token";
import { getUserById } from "../controllers/userController";

const usersRoutes: Router = express.Router();
usersRoutes.use(doubleCsrfProtection);

usersRoutes.post("/:_id", authMiddleware, (req: Request, res: Response) =>
  getUserById(req, res)
);

export default usersRoutes;
