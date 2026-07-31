export type CommentType = "post" | "profile";

export type CommentTarget =
  | { type: "post"; post_id: number }
  | { type: "profile"; profile_user_id: number };

export type CommentUser = {
  id: number;
  user_name: string;
  avatar: string | null;
};

// export type CommentVotes = {
//   upvotes?: number;
//   downvotes?: number;
//   ai_votes?: number;
// };

export type Comment = {
  id: number;
  text: string;
  type: CommentType;
  created_at: string;
  user: CommentUser;
  votes: CommentVotes;
};

export type CreateCommentPayload = CommentTarget & {
  text: string;
};

export type UpdateCommentPayload = {
  text: string;
};

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type PaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type PaginatedComments =
  | Comment[]
  | {
      data: Comment[];
      links?: PaginationLinks;
      meta?: PaginationMeta;
    };

export function normalizePaginatedComments(payload: PaginatedComments): {
  items: Comment[];
  meta: PaginationMeta | null;
} {
  if (Array.isArray(payload)) {
    return { items: payload, meta: null };
  }

  return {
    items: Array.isArray(payload?.data) ? payload.data : [],
    meta: payload?.meta ?? null,
  };
}