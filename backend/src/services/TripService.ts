import path from "path";
import fs, { readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { ImageUploaded, ITrip } from "../models/Trip";
import slugify from "slugify";
import imageSize from "image-size";
import sharp from "sharp";

interface File {
  originalname: string;
  path: string;
}

export const moveFilesIfExists = (
  images: File[] | null,
  tracks: File[] | null,
  trip: ITrip,
): ITrip => {
  if (images && images.length > 0) {
    const finalPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      trip.slug,
      "images",
    );
    fs.mkdirSync(finalPath, { recursive: true });

    trip.images = [
      ...(trip.images ?? []),
      ...images.map((file) => {
        const ext = path.extname(file.originalname);
        const finalName = `${path.basename(
          file.originalname,
          ext,
        )}-${Date.now()}${ext}`;
        const destPath = path.join(finalPath, finalName);

        fs.renameSync(file.path, destPath);
        const buffer = readFileSync(destPath);
        const dimensions = imageSize(buffer);

        return {
          filename: finalName,
          path: `/uploads/${trip.slug}/images/${finalName}`,
          folder: `/uploads/${trip.slug}/images`,
          uuid: uuidv4(),
          width: dimensions.width,
          height: dimensions.height,
        };
      }),
    ];
  }

  if (tracks && tracks.length > 0) {
    const finalPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      trip.slug,
      "tracks",
    );
    fs.mkdirSync(finalPath, { recursive: true });

    trip.tracks = [
      ...(trip.tracks ?? []),
      ...tracks.map((file) => {
        const ext = path.extname(file.originalname);
        const finalName = `${slugify(
          path.basename(file.originalname, ext),
        )}-${Date.now()}${ext}`;
        const destPath = path.join(finalPath, finalName);

        fs.renameSync(file.path, destPath);

        return {
          filename: finalName,
          path: `/uploads/${trip.slug}/tracks/${finalName}`,
          uuid: uuidv4(),
        };
      }),
    ];
  }

  return trip;
};

export enum CloneType {
  thumbnail,
  hd,
}

export const CloneImage = async (image: ImageUploaded, type: CloneType) => {
  if (
    !fs.existsSync(path.join(__dirname, "..", "..", image.folder, "thumbnail"))
  ) {
    fs.mkdirSync(path.join(__dirname, "..", "..", image.folder, "thumbnail"), {
      recursive: true,
    });
  }
  if (!fs.existsSync(path.join(__dirname, "..", "..", image.folder, "hd"))) {
    fs.mkdirSync(path.join(__dirname, "..", "..", image.folder, "hd"), {
      recursive: true,
    });
  }

  await sharp(path.join(__dirname, "..", "..", image.path))
    .rotate()
    .resize({
      width: parseInt(type == CloneType.thumbnail ? "200" : "1920"),
      height: parseInt(type == CloneType.thumbnail ? "200" : "1080"),
      fit: "inside",
      withoutEnlargement: true,
    })
    .toFile(
      path.join(
        __dirname,
        "..",
        "..",
        image.folder,
        type == CloneType.thumbnail ? "thumbnail" : "hd",
        image.filename,
      ),
    );
};

export const removeImage = (
  image: ImageUploaded,
): NodeJS.ErrnoException | null => {
  fs.unlink(image.path, (err) => {
    if (err) {
      return err;
    }
  });
  fs.unlink(
    path.join(__dirname, "..", "..", image.folder, "thumbnail", image.filename),
    (err) => {
      if (err) {
        return err;
      }
    },
  );
  fs.unlink(
    path.join(__dirname, "..", "..", image.folder, "hd", image.filename),
    (err) => {
      if (err) {
        return err;
      }
    },
  );

  return null;
};
