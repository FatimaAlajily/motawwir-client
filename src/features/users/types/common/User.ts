import type { UserType } from "./UserType";

export type User = {
  id: number;
  user_name: string;
  avatar: string | null;
  role: UserType;
  votra?: number;
  email?: string;
  is_banned?: boolean;
  ban_reason?: string | null;
  banned_at?: string | null;
};
