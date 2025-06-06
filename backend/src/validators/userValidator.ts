import { body } from "express-validator";

export const updateUserValidator = [
  body("username").isString().notEmpty().withMessage("Username è richiesto"),
  body("name").isString().notEmpty().withMessage("Il Nome è richiesto"),
  body("email").isEmail().notEmpty().withMessage("L'Email' è richiesta"),
];