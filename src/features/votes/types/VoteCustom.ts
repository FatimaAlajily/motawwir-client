export type VoteCustom = "upvote" | "downvote" | "ai";

export type VotePayload = {
  type: "post" | "comment";
  custom: VoteCustom;
  post_id?: number;
  comment_id?: number;
};