export enum Segment {
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
  altro = "Altro",
}

export interface Moto {
  _id: string;
  name: string;
  segment: Segment;
  image: string;
  consumo: string;
}

export interface CreateMotoDto {
  name: string;
  consumo: string;
  segment: Segment | null;
  image: File | null;
}

export interface UpdateMotoDto extends CreateMotoDto {
  _id: string;
}
