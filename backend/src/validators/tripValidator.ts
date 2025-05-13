import { body } from "express-validator";
import Trip from "../models/Trip";

export const createTripValidator = [
  body("title").notEmpty().withMessage("Il titolo è richiesto"),
  body("slug")
    .isString()
    .withMessage("Lo slug è richiesto")
    .isLength({ max: 50 })
    .withMessage("La lunghezza massima dello slug è 50 caratteri")
    .custom(async (value) => {
      const trip = await Trip.findOne({ slug: value });
      if (trip) {
        throw new Error("Slug già esistente");
      }
    }),

  body("rating").notEmpty().isNumeric(),
  body("km").notEmpty().isNumeric(),
  body("velocity").notEmpty().isNumeric(),

  body("start").isISO8601().withMessage("La data di partenza non è valida"),
  body("end").isISO8601().withMessage("La data di arrivo non è valida"),
];

export const updateTripValidator = [
  body("title").notEmpty().withMessage("Il titolo è richiesto"),

  body("newSlug").custom(async (value) => {
    if (value) {
      const trip = await Trip.findOne({ slug: value });
      if (trip) {
        throw new Error("Slug già esistente");
      }
    }
  }),

  body("rating").notEmpty().isNumeric().withMessage("Dare un voto al viaggio"),

  body("km")
    .notEmpty()
    .isNumeric()
    .withMessage("Il numero inserito per i kilometri non è valido"),
  body("velocity")
    .notEmpty()
    .isNumeric()
    .withMessage("La velocità inserita non è valida"),
  body("start").isISO8601().withMessage("La data di partenza non è valida"),
  body("end").isISO8601().withMessage("La data di arrivo non è valida"),
];
