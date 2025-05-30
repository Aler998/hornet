import { body } from "express-validator";

export const createUpdateUserValidator = [
  body("email").isString().notEmpty().withMessage("Email è richiesto"),
  body("password").isString().withMessage("La password è richiesta"),
];