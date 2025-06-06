export default interface LoginRequest {
  username: string;
  password: string;
}
export interface User {
  _id: string,
  name: string,
  username: string,
  email: string,
  profile:string,
  cover: string
  isAdmin: boolean
}

export interface UpdateUserDto {
  username: string;
  name: string;
  email: string;
  profile: File | null;
  cover: File | null;
}