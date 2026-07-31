import type { UserDetails } from "../../../shared/types/UserDetails";
import type { SimpleComment, SingleVote } from "./Interact";

export type NotificationType = "vote" | "comment";
export type AppNotification = {
  id: number;
  type: NotificationType;
  is_read: boolean;
  from_user: UserDetails;
  comment?: SimpleComment;
  vote?: SingleVote;
  created_at: string;
};
