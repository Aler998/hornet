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
  time: string;
  start: Dayjs;
  end: Dayjs;
  category: string;
  images: UploadedFile[];
  tracks: UploadedFile[];
  decodedTracks?: string[];
  places?: Place[];
}

export interface CreateTripDto {
  title: string;
  description: string;
  rating: number;
  km: number;
  velocity: number;
  slug: string;
  time: string;
  start: Dayjs;
  end: Dayjs;
  category: string;
  images: File[] | null;
  tracks: File[] | null;
  places: Place[];
}

export interface UpdateTripDto extends CreateTripDto {
  newSlug?: string;
}

export interface UploadedFile {
  filename: string;
  path: string;
  uuid: string;
}

export interface Place {
  place_id: string;
  lat: string;
  lon: string;
  name: string;
  display_name: string;
}

export type TripTableRowProps = {
  row: Trip;
  selected: boolean;
  onSelectRow: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export function isUpdateTripDto(
  trip: CreateTripDto | UpdateTripDto
): trip is UpdateTripDto {
  return "newSlug" in trip;
}
