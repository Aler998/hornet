import { body } from "express-validator";
import Category from "../models/Category";

export const createCategoryValidator = [
  body("title").notEmpty().withMessage("Il titolo è richiesto"),
  body("slug")
    .isString()
    .withMessage("Lo slug è richiesto")
    .isLength({ max: 50 })
    .withMessage("La lunghezza massima dello slug è 50 caratteri")
    .custom(async (value) => {
      const category = await Category.findOne({ slug: value });
      if (category) {
        throw new Error("Slug già esistente");
      }
    }),
];

export const updateCategoryValidator = [
  body("title").notEmpty().withMessage("Il titolo è richiesto"),

  body("newSlug").custom(async (value) => {
    if (value) {
      const category = await Category.findOne({ slug: value });
      if (category) {
        throw new Error("Slug già esistente");
      }
    }
  }),
];
