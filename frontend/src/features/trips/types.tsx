import { Dayjs } from "dayjs";

export interface Trip {
  _id: string;
  title: string;
  description: string;
  rating: number;
  liters: number;
  km: number;
  slug: string;
  start: Dayjs | null;
  end: Dayjs | null;
  category: string;
  images: UploadedImage[];
  tracks: UploadedFile[];
  decodedTracks?: string[]
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
