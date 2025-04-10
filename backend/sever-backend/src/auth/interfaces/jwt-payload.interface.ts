// auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  nameUser: string;
  email: string;
  phone: string | null;
  address: string | null;
  profilePicture: string | null;
  roles: string[]; // Danh sách vai trò
  permissions: string[]; // Danh sách quyền
  iat?: number | null; // Thời gian tạo token (JWT standard)
  exp?: number | null; // Thời gian hết hạn token (JWT standard)
}
