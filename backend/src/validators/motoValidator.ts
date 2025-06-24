import { body } from "express-validator";

export const createUpdateMotoValidator = [
  body("name").isString().notEmpty().withMessage("Il titolo è richiesto"),
];