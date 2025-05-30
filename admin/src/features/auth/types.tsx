export default interface LoginRequest {
  username: string;
  password: string;
}
export interface User {
  id: string,
  isAdmin: boolean
}