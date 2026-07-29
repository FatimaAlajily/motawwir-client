import type { Role } from "./Role";

export type Register = {
  user_name: string;
  email: string;
  password: string;
  role: Role;
};
