import express, { Request, Response, Router } from "express";

import { validateResult } from "../middleware/validateResult";
import authMiddleware from "../middleware/auth";
import { doubleCsrfProtection } from "../middleware/csrf-token";
import {
  createMoto,
  deleteMoto,
  getAllMotos,
  getMotoById,
  updateMoto,
} from "../controllers/motoController";
import { createUpdateMotoValidator } from "../validators/motoValidator";
import upload from "../middleware/tmpStorage";

const motosRoutes: Router = express.Router();

motosRoutes.get("/", authMiddleware, (req: Request, res: Response) =>
  getAllMotos(req, res)
);

motosRoutes.get("/:_id", authMiddleware, (req: Request, res: Response) =>
  getMotoById(req, res)
);

motosRoutes.use(doubleCsrfProtection);

motosRoutes.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createUpdateMotoValidator,
  validateResult,
  (req: Request, res: Response) => createMoto(req, res)
);

motosRoutes.put(
  "/:_id",
  authMiddleware,
  upload.single("image"),
  createUpdateMotoValidator,
  validateResult,
  (req: Request, res: Response) => updateMoto(req, res)
);

motosRoutes.delete("/:_id", authMiddleware, (req: Request, res: Response) =>
  deleteMoto(req, res)
);

export default motosRoutes;
