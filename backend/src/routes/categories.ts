import express, { Request, Response, Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/categoryController";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/categoryValidator";
import { validateResult } from "../middleware/validateResult";
import authMiddleware from "../middleware/auth";

const categoriesRoutes: Router = express.Router();

categoriesRoutes.get("/", (req: Request, res: Response) =>
  getAllCategories(req, res),
);

categoriesRoutes.get("/:slug", (req: Request, res: Response) =>
  getCategoryBySlug(req, res),
);

categoriesRoutes.post(
  "/",
  authMiddleware,
  createCategoryValidator,
  validateResult,
  (req: Request, res: Response) => createCategory(req, res),
);

categoriesRoutes.put(
  "/:slug",
  authMiddleware,
  updateCategoryValidator,
  validateResult,
  (req: Request, res: Response) => updateCategory(req, res),
);

categoriesRoutes.delete(
  "/:slug",
  authMiddleware,
  (req: Request, res: Response) => deleteCategory(req, res),
);

export default categoriesRoutes;
