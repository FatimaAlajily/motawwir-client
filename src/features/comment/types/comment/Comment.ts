export type CommentType = "post" | "profile";

// نفس منطق StoreCommentRequest: post_id مطلوب لنوع post، profile_user_id مطلوب لنوع profile
export type CommentTarget =
  | { type: "post"; post_id: number }
  | { type: "profile"; profile_user_id: number };

export type CommentUser = {
  id: number;
  user_name: string;
  avatar: string | null;
};

// شكل VoteResource غير معروف بالكامل من الباك اند المرسل، لذا الحقول اختيارية
export type CommentVotes = {
  likes_count?: number;
  dislikes_count?: number;
  user_vote?: "like" | "dislike" | null;
};

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

// شكل paginate() اللي تلفه CommentResource::collection() تلقائياً —
// جعلناه يقبل الشكلين لأن بعض إعدادات Laravel (withoutWrapping) تشيل التغليف الإضافي
export type PaginatedComments =
  | Comment[]
  | {
      data: Comment[];
      links?: PaginationLinks;
      meta?: PaginationMeta;
    };

// يوحّد الشكلين إلى نفس الصيغة عشان useComments ما ينكسر مهما كان شكل الرد
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