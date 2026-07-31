import type { UserType } from "./UserType";

export type User = {
  id: number;
  user_name: string;
  avatar: string;
  role: UserType;
  votes?: number;
  email?: string;
  is_banned?: boolean;
  ban_reason?: string | null;
  banned_at?: string | null;
};
