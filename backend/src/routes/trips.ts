import express, { Request, Response, Router } from "express";
import {
  getAllTrips,
  getTripBySlug,
  createTrip,
  updateTrip,
  deleteTrip,
  deleteTripImage,
  deleteTripTrack,
} from "../controllers/tripController";
import upload from "../middleware/tmpStorage";
import {
  createTripValidator,
  updateTripValidator,
} from "../validators/tripValidator";
import { validateResult } from "../middleware/validateResult";
import authMiddleware from "../middleware/auth";
import { doubleCsrfProtection } from "../middleware/csrf-token";

const tripRoutes: Router = express.Router();

tripRoutes.get("/", (req: Request, res: Response) => getAllTrips(req, res));

tripRoutes.get("/:slug", (req: Request, res: Response) =>
  getTripBySlug(req, res)
);

tripRoutes.post(
  "/",
  authMiddleware,
  doubleCsrfProtection,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "tracks", maxCount: 10 },
  ]),
  createTripValidator,
  validateResult,
  (req: Request, res: Response) => createTrip(req, res)
);

tripRoutes.put(
  "/:slug",
  authMiddleware,
  doubleCsrfProtection,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "tracks", maxCount: 10 },
  ]),
  updateTripValidator,
  validateResult,
  (req: Request, res: Response) => updateTrip(req, res)
);

tripRoutes.delete(
  "/:slug",
  authMiddleware,
  doubleCsrfProtection,
  (req: Request, res: Response) => deleteTrip(req, res)
);

tripRoutes.delete(
  "/:slug/images/:image",
  authMiddleware,
  doubleCsrfProtection,
  (req: Request, res: Response) => deleteTripImage(req, res)
);
tripRoutes.delete(
  "/:slug/tracks/:track",
  authMiddleware,
  doubleCsrfProtection,
  (req: Request, res: Response) => deleteTripTrack(req, res)
);

export default tripRoutes;
