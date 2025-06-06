import express, { Request, Response, Router } from "express";

import authMiddleware from "../middleware/auth";
import { doubleCsrfProtection } from "../middleware/csrf-token";
import { getUserById } from "../controllers/userController";
import upload from "../middleware/tmpStorage";
import { updateUserValidator } from "../validators/userValidator";
import { validateResult } from "../middleware/validateResult";
import { updateUser } from "../controllers/userController";

const usersRoutes: Router = express.Router();
usersRoutes.use(doubleCsrfProtection);

usersRoutes.post("/:_id", authMiddleware, (req: Request, res: Response) =>
  getUserById(req, res)
);

usersRoutes.put(
  "/update",
  authMiddleware,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  updateUserValidator,
  validateResult,
  (req: Request, res: Response) => updateUser(req, res)
);

export default usersRoutes;
