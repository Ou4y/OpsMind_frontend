export type Role = "student" | "technician" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  role: Role;
}