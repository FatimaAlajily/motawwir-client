import type { UserDetails } from "../../../shared/types/UserDetails";

export type Message = {
  id: number;
  message: string;
  user: UserDetails;
  created_at: string;
};