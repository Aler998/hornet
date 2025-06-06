import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { moveImage } from "../services/AuthService";

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

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userDecoded = req.user;
  if (!userDecoded) {
    return;
  }
  const user = await User.findOne({ _id: { $eq: userDecoded.id } });

  if (user) {
    const newEmail = req.body.email == user.email ? null : req.body.email;
    const newUsername =
      req.body.username == user.username ? null : req.body.username;

    if (newEmail) {
      const alreadyExists = await User.findOne({ email: { $eq: newEmail } });
      if (alreadyExists) {
        res.status(422).json({ message: [{ msg: "Email già esistente" }] });
        return;
      }
    }
    if (newUsername) {
      const alreadyExists = await User.findOne({
        username: { $eq: newUsername },
      });
      if (alreadyExists) {
        res.status(422).json({ message: [{ msg: "Username già esistente" }] });
        return;
      }
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const cover = files["cover"] || null;
    const profile = files["profile"] || null;

    const updateData = {
      ...req.body,
      cover: cover ? moveImage(user._id, cover[0], user.cover) : user.cover,
      profile: profile
        ? moveImage(user._id, profile[0], user.profile)
        : user.profile,
    };

    await user.updateOne(updateData);

    res.json(user);
  }
  return;
};
