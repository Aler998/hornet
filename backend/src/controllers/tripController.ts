import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Trip from "../models/Trip";
import {
  CloneImage,
  CloneType,
  moveFilesIfExists,
  removeImage,
} from "../services/TripService";
import { NotFoundError } from "../errors/NotFoundError";

export const getAllTrips = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};

export const getTripBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = await Trip.findOneWithDecodedTracks(req.params.slug);

    if (!trip || trip == null)
      res.status(404).json({ error: "Trip not found" });

    res.json(trip);
  } catch (err) {
    if (err instanceof NotFoundError)
      res.status(404).json({ message: "Trip not found" });

    res.status(500).json({ message: "Errore del server" });
  }
};

export const createTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = new Trip({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      rating: req.body.rating,
      km: req.body.km,
      liters: req.body.liters,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
    });

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const images = files["images"] || null;
    const tracks = files["tracks"] || null;

    moveFilesIfExists(images, tracks, trip);
    await trip.save();

    trip.images.map(async (image) => {
      await CloneImage(image, CloneType.thumbnail);
      await CloneImage(image, CloneType.hd);
    });

    res.status(201).json(trip);
  } catch (err: any) {
    res.status(500).json({ message: "Errore del server" });
  }
};

export const updateTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });
    if (!trip || trip == null) {
      res.status(404).json({ error: "Trip not found" });
      return;
    }

    if (req.body.newSlug) trip.slug = req.body.newSlug;

    trip.title = req.body.title;
    trip.start = req.body.start;
    trip.end = req.body.end;
    trip.description = req.body.description;
    trip.rating = req.body.rating;
    trip.km = req.body.km;
    trip.liters = req.body.liters;
    trip.category = req.body.category;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const images = files["images"] || null;
    const tracks = files["tracks"] || null;

    moveFilesIfExists(images, tracks, trip);
    trip.images.map(async (image) => {
      await CloneImage(image, CloneType.thumbnail);
      await CloneImage(image, CloneType.hd);
    });

    await trip.save();

    res.json(trip);
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "Slug già utilizzato",
      });
      return;
    }

    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = await Trip.findOneBySlug(req.params.slug);

    fs.rm(
      path.join(__dirname, "..", "..", "uploads", req.params.slug),
      { recursive: true, force: true },
      (err) => {
        if (err) {
          return console.error("Errore:", err);
        }
        console.log("Cartella eliminata");
      }
    );
    
    const deleted = await trip?.deleteOne();
    if (!deleted) res.status(404).json({ error: "Trip not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteTripImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });

    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return;
    }

    const image = trip.images.find((image) => image.uuid === req.params.image);

    if (!image) {
      res.status(400).json({ message: "Immagine non trovata" });
      return;
    }

    const filePath = path.join(__dirname, "..", "..", image.path);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "Immagine non trovata" });
      return;
    }

    const err = removeImage(image);
    if (err)
      res.status(500).json({
        message: "Errore nell'eliminazione dell'immagine",
        error: err,
      });

    trip.images = trip.images.filter((_image) => _image.uuid !== image.uuid);

    await trip.save();
    res.status(200).json({ message: "Immagine eliminata con successo" });
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteTripTrack = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });

    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return;
    }

    const track = trip.tracks.find((track) => track.uuid === req.params.track);

    if (!track) {
      res.status(400).json({ message: "Immagine non trovata" });
      return;
    }

    const filePath = path.join(__dirname, "..", "..", track.path);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "Immagine non trovata" });
      return;
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Errore nell'eliminazione dell'immagine",
          error: err,
        });
      }
    });

    trip.tracks = trip.tracks.filter((_track) => _track.uuid !== track.uuid);

    await trip.save();
    res.status(200).json({ message: "Track eliminata con successo" });
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};
