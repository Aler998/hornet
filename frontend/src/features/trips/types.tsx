import { Dayjs } from "dayjs";

export interface Trip {
  _id: string;
  title: string;
  description: string;
  rating: number;
  liters: number;
  km: number;
  velocity: number;
  slug: string;
  start: Dayjs | null;
  end: Dayjs | null;
  category: string;
  images: UploadedImage[];
  tracks: UploadedFile[];
  decodedTracks?: string[];
  places?: Place[]
}

export interface UploadedFile {
  filename: string;
  path: string;
  uuid: string;
}
export interface UploadedImage extends UploadedFile {
  width: number;
  height: number;
  folder: string;
}

export interface Place {
  place_id: string;
  lon: string;
  lat: string;
  name: string;
  display_name: string;
}