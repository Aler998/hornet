import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.params;
    const user: IUser | null = await User.findById(_id);

    if (!user) {
      res.status(404).json({ error: "user not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
};

