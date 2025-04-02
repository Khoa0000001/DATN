// auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  nameUser: string;
  email: string;
  phone: string | null;
  address: string | null;
  profilePicture: string | null;
}
