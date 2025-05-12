import { Dayjs } from "dayjs";

export interface Trip {
  _id: string;
  title: string;
  description: string;
  rating: number;
  km: number;
  velocity: number;
  liters: number;
  slug: string;
  start: Dayjs;
  end: Dayjs;
  category: string;
  images: UploadedFile[];
  tracks: UploadedFile[];
  decodedTracks?: string[]
}

export interface CreateTripDto {
  title: string;
  description: string;
  rating: number;
  km: number;
  velocity: number;
  slug: string;
  start: Dayjs;
  end: Dayjs;
  category: string
  images: File[] | null;
  tracks: File[] | null;
}

export interface UpdateTripDto extends CreateTripDto {
  newSlug?: string;
}

export interface UploadedFile {
  filename: string;
  path: string;
  uuid: string;
}

export type TripTableRowProps = {
  row: Trip;
  selected: boolean;
  onSelectRow: () => void;
  onDelete: () => void;
  onEdit: () => void;
};