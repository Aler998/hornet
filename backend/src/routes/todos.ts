import express, { Request, Response, Router } from "express";

import { validateResult } from "../middleware/validateResult";
import authMiddleware from "../middleware/auth";
import { doubleCsrfProtection } from "../middleware/csrf-token";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todoController";
import { createUpdateTodoValidator } from "../validators/todoValidator";

const todosRoutes: Router = express.Router();

todosRoutes.get("/", (req: Request, res: Response) => getAllTodos(req, res));

todosRoutes.get("/:_id", (req: Request, res: Response) =>
  getTodoById(req, res)
);

todosRoutes.use(doubleCsrfProtection);

todosRoutes.post(
  "/",
  authMiddleware,
  createUpdateTodoValidator,
  validateResult,
  (req: Request, res: Response) => createTodo(req, res)
);

todosRoutes.put(
  "/:_id",
  authMiddleware,
  createUpdateTodoValidator,
  validateResult,
  (req: Request, res: Response) => updateTodo(req, res)
);

todosRoutes.delete("/:_id", authMiddleware, (req: Request, res: Response) =>
  deleteTodo(req, res)
);

export default todosRoutes;
