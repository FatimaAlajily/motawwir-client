import type { UserDetails } from "../../../shared/types/UserDetails";
import type { VoteDetails } from "../../../shared/types/VoteDetails";

export type BasePost = {
  id: number;
  title: string;
  created_at: string;
  user: UserDetails;
  votes: VoteDetails;
};
