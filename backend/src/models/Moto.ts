import mongoose, { Document, Schema } from "mongoose";

enum Segment {
  sport = "Sport",
  supersport = "Super Sportiva",
  gran_turismo = "Gran Turismo",
  turismo = "Turismo",
  naked = "Naked",
  custom = "Custom",
  supermotard = "Super Motard",
  adventure = "Adventure",
  enduro = "Enduro",
  cross = "Cross",
  trial = "Trial",
  altro = "Altro"
}

interface IMoto extends Document {
  name: string;
  segment: Segment;
  image?: string;
  consumo: string;
  km?: string;
  user: Schema.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}

const motoSchema = new Schema<IMoto>(
  {
    name: { type: String, required: true },
    segment: { type: String, required: true },
    image: { type: String, required: false },
    consumo: { type: String, required: true },
    km: { type: Number, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Moto = mongoose.model<IMoto>("Moto", motoSchema);

export default Moto;
export type { IMoto };
