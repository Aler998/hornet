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
import { getCurrentBenzinaPrice } from "../services/FetchCostoBenzina";
import Moto, { IMoto } from "../models/Moto";
import mongoose from "mongoose";

const CONSUMO_MOTO_DEFAULT = 25;

export const getAllTrips = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const limit = req.query.limit as unknown as number | undefined;
    const trips = await Trip.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit ? limit : 1000);
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

export const getTripBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trip = await Trip.findOneWithDecodedTracks(
      req.user?.id || "",
      req.params.slug
    );

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
    const alreadyExists = await Trip.findOne({
      slug: { $eq: req.body.slug },
      user: { $eq: req.user?.id },
    });

    if (alreadyExists) {
      res.status(422).json({ message: [{ msg: "Slug già esistente" }] });
      return;
    }

    let moto;

    if (mongoose.Types.ObjectId.isValid(req.body.moto))
    {
      moto = await Moto.findOne({
        _id: { $eq: req.body.moto },
        user: { $eq: req.user?.id },
      });    
    } else {
      moto = undefined
    }

    const trip = new Trip({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      rating: req.body.rating,
      time: req.body.time,
      km: req.body.km,
      velocity: req.body.velocity,
      maxAlt: req.body.maxAlt,
      liters: req.body.km / (moto ? parseFloat(moto.consumo) : CONSUMO_MOTO_DEFAULT),
      cost: (req.body.km / (moto ? parseFloat(moto.consumo) : CONSUMO_MOTO_DEFAULT)) * (await getCurrentBenzinaPrice()),
      start: req.body.start,
      end: req.body.end,
      category: req.body.category,
      places: req.body.places,
      user: req.user?.id,
      moto: moto?._id ?? null
    });

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const images = files["images"] || null;
    const tracks = files["tracks"] || null;

    const result: boolean = moveFilesIfExists(images, tracks, trip);
    if (result) {
      await trip.save();

      trip.images.map(async (image) => {
        await CloneImage(image, CloneType.thumbnail);
        await CloneImage(image, CloneType.hd);
      });

      res.status(201).json(trip);
    } else {
      res.status(500).json({ message: "Errore salvataggio files" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

export const updateTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user?.id;
    const trip = await Trip.findOne({ user: user, slug: req.params.slug });
    if (!trip || trip == null) {
      res.status(404).json({ error: "Trip not found" });
      return;
    }

    if (req.body.newSlug) {
      const alreadyExists = await Trip.findOne({
        slug: { $eq: req.body.newSlug },
        user: { $eq: req.user?.id },
      });

      if (alreadyExists) {
        res.status(422).json({ message: [{ msg: "Slug già esistente" }] });
        return;
      }
      trip.slug = req.body.newSlug;
    }

      const moto : IMoto | null = mongoose.Types.ObjectId.isValid(req.body.moto) ? await Moto.findOne({
        _id: { $eq: req.body.moto },
        user: { $eq: req.user?.id },
      }) : null;    

    if (trip.km != req.body.km) {
      trip.liters = (req.body.km / (moto ? parseFloat(moto.consumo) : CONSUMO_MOTO_DEFAULT)).toString();
      trip.cost = (
        (req.body.km / (moto ? parseFloat(moto.consumo) : CONSUMO_MOTO_DEFAULT)) *
        (await getCurrentBenzinaPrice())
      ).toString();
    }

    trip.title = req.body.title;
    trip.start = req.body.start;
    trip.end = req.body.end;
    trip.description = req.body.description;
    trip.rating = req.body.rating;
    trip.time = req.body.time;
    trip.km = req.body.km;
    trip.velocity = req.body.velocity;
    trip.maxAlt = req.body.maxAlt;
    trip.category = req.body.category;
    trip.moto = moto?._id ?? null;
    trip.places = req.body.places;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const images = files["images"] || null;
    const tracks = files["tracks"] || null;

    const result: boolean = moveFilesIfExists(images, tracks, trip);

    if (result) {
      trip.images.map(async (image) => {
        await CloneImage(image, CloneType.thumbnail);
        await CloneImage(image, CloneType.hd);
      });
      await trip.save();

      res.json(trip);
    } else {
      res.status(500).json({ message: "Errore salvataggio files" });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    console.error(err);

    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id || "";
    const trip = await Trip.findOneBySlug(userId, req.params.slug);
    if (trip) {
      fs.rm(
        path.join(__dirname, "..", "..", "uploads", trip?.slug),
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
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(500).json({ message: "Errore del server" });
  }
};
