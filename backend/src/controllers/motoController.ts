import { Request, Response } from "express";
import Moto, { IMoto } from "../models/Moto";
import { moveImage } from "../services/AuthService";
import path from "path";
import fs from "fs";

export const getAllMotos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const motos: IMoto[] = await Moto.find({ user: { $eq: userId } }).sort({
      order: 1,
    });
    res.json(motos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

export const getMotoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { _id } = req.params;
    console.log(_id);
    console.log(userId);

    const moto: IMoto | null = await Moto.findOne({
      _id: _id,
      user: userId,
    });

    if (!moto) {
      res.status(404).json({ error: "moto not found" });
      return;
    }

    res.json(moto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

export const createMoto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.id;

  try {
    const file = req.file;

    const moto: IMoto = new Moto({
      ...req.body,
      image: file ? moveImage(userId, file, undefined, "moto") : null,
      user: userId,
    });
    await moto.save();
    res.status(201).json(moto);
  } catch (err: unknown) {
    if (err instanceof Error && err.name == "ValidationError") {
      res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: "Errore del server" });
  }
};

export const updateMoto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;

    const { _id } = req.params;

    const file = req.file;

    const moto = await Moto.findOne({
      _id: { $eq: _id },
      user: { $eq: userId },
    });

    const updatedMoto: IMoto | null = await moto?.updateOne({
      $set: {
        ...req.body,
        image: file
          ? moveImage(userId, file, moto.image ? moto.image : undefined, "moto")
          : moto.image,
      },
    });

    if (!updatedMoto) {
      res.status(404).json({ error: "Moto not found" });
      return;
    }

    res.json(updatedMoto);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
      }
    }
    res.status(500).json({ message: "Errore del server" });
  }
};

export const deleteMoto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { _id } = req.params;

    const moto = await Moto.findOne({
      _id: { $eq: _id },
      user: { $eq: userId },
    });

    if (!moto) {
      res.status(404).json({ error: "Moto not found" });
    }

    if (moto?.image) {
      const filePath = path.join(__dirname, "..", "..", moto.image);

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
    }

    await moto?.deleteOne()

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};
