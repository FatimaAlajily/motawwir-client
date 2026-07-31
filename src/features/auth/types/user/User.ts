import type { Role } from "./Role";

export type User = {
  id: number;
  user_name: string;
  email?: string;
  avatar: string;
  role: Role;
  is_banned?: boolean;
  ban_reason?: string | null;
  banned_at?: string | null;
};
