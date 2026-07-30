export type SimpleComment = {
  id: number;
  text: string;
  type: "post" | "profile";
  post_id: number | null;
  profile_user_id: number | null;
};

export type SingleVote = {
  id: number;
  custom: "upvote" | "downvote" | "ai";
  post_id: number | null;
  comment_id: number | null;
};
