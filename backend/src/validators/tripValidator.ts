import { body, query } from "express-validator";

export const getTripsValidator = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit deve essere un numero intero tra 1 e 100")
    .toInt(),
];

export const createTripValidator = [
  body("title").notEmpty().withMessage("Il titolo è richiesto"),
  body("slug")
    .isString()
    .withMessage("Lo slug è richiesto")
    .isLength({ max: 50 })
    .withMessage("La lunghezza massima dello slug è 50 caratteri"),

  body("rating").notEmpty().isNumeric(),
  body("time")
    .notEmpty()
    .isNumeric()
    .withMessage("Il numero inserito per i minuti di percorrenza non è valido"),
  body("km")
    .notEmpty()
    .isNumeric()
    .withMessage("Il numero inserito per i minuti di percorrenza non è valido"),
  body("velocity")
    .notEmpty()
    .isNumeric()
    .withMessage("La velocità inserita non è valida"),
  body("maxAlt")
    .notEmpty()
    .isNumeric()
    .withMessage("L'altitudine inserita non è valida"),

  body("start").isISO8601().withMessage("La data di partenza non è valida"),
  body("end").isISO8601().withMessage("La data di arrivo non è valida"),
];

export const updateTripValidator = [
  body("title").notEmpty().withMessage("Il titolo è richiesto"),

  body("rating").notEmpty().isNumeric().withMessage("Dare un voto al viaggio"),

  body("time")
    .notEmpty()
    .isNumeric()
    .withMessage("Il numero inserito per i minuti di percorrenza non è valido"),
  body("km")
    .notEmpty()
    .isNumeric()
    .withMessage("Il numero inserito per i kilometri non è valido"),
  body("velocity")
    .notEmpty()
    .isNumeric()
    .withMessage("La velocità inserita non è valida"),
  body("maxAlt")
    .notEmpty()
    .isNumeric()
    .withMessage("L'altitudine inserita non è valida"),
  body("start").isISO8601().withMessage("La data di partenza non è valida"),
  body("end").isISO8601().withMessage("La data di arrivo non è valida"),
];
