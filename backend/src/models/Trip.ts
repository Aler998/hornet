import mongoose, { Document, Model, Schema } from "mongoose";
import path from "path";
import fs from "fs/promises";
import { NotFoundError } from "../errors/NotFoundError";

interface FileUploaded {
  path: string;
  uuid: string;
  filename: string;
}

interface ImageUploaded extends FileUploaded {
  folder: string;
  width: number;
  height: number;
}

interface Place {
  place_id: string;
  lat: string;
  lon: string;
  name: string;
  display_name: string;
}
interface TripWithDecodedTracks extends Omit<ITrip, keyof Document> {
  decodedTracks: string[];
}

const fileSchema = new Schema<FileUploaded>(
  {
    path: { type: String, required: true },
    uuid: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { _id: false }
);

const placeSchema = new Schema<Place>({
  place_id: { type: String, required: true },
  lat: { type: String, required: true },
  lon: { type: String, required: true },
  name: { type: String, required: true },
  display_name: { type: String, required: true },
});

const imageSchema = new Schema<ImageUploaded>(
  {
    path: { type: String, required: true },
    uuid: { type: String, required: true },
    filename: { type: String, required: true },
    folder: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false }
);

interface ITrip extends Document {
  title: string;
  slug: string;
  description?: string;
  rating?: string;
  km?: string;
  velocity?: string;
  liters?: string;
  time?: string;
  start: Date;
  end: Date;
  category: mongoose.Types.ObjectId;
  images: ImageUploaded[];
  tracks: FileUploaded[];
  places: Place[];
}

interface ITripMethods {
  getDecodedTracks(): Promise<string[]>;
}

interface TripModel extends Model<ITrip, object, ITripMethods> {
  findOneWithDecodedTracks(slug: string): Promise<TripWithDecodedTracks | null>;
  findOneBySlug(slug: string): Promise<ITrip | null>;
}

const tripSchema = new Schema<ITrip, TripModel, ITripMethods>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    rating: { type: Number, required: true },
    km: { type: Number, required: true },
    velocity: { type: Number, required: true },
    liters: { type: Number, required: true },
    time: { type: Number, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: { type: [imageSchema], default: [] },
    tracks: { type: [fileSchema], default: [] },
    places: { type: [placeSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

tripSchema.method("getDecodedTracks", async function (): Promise<string[]> {
  const results = await Promise.all(
    this.tracks.map(async (track: FileUploaded) => {
      const fullPath = path.join(__dirname, "../../", track.path);

      try {
        const data = await fs.readFile(fullPath, "utf8");
        return data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return null;
      }
    })
  );

  return results.filter(Boolean) as string[];
});

tripSchema.static(
  "findOneBySlug",
  async function (this: TripModel, slug: string): Promise<ITrip | null> {
    return await this.findOne({ slug: slug });
  }
);

tripSchema.static(
  "findOneWithDecodedTracks",
  async function (
    this: TripModel,
    slug: string
  ): Promise<TripWithDecodedTracks | null> {
    const trip = await this.findOne({ slug: slug });

    if (!trip) {
      throw new NotFoundError(404, "Trip not found");
    }

    const decodedTracks = await trip.getDecodedTracks();

    return {
      ...trip.toObject(),
      decodedTracks,
    };
  }
);

const Trip = mongoose.model<ITrip, TripModel>("Trip", tripSchema);

export default Trip;
export type { ITrip, FileUploaded, ImageUploaded, TripModel };
