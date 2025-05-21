import { body } from "express-validator";

export const createUpdateTodoValidator = [
  body("title").isString().notEmpty().withMessage("Il titolo è richiesto"),
  body("link").isString().withMessage("Il link è richiesto"),
];