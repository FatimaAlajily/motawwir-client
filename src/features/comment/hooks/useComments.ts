import { useCallback, useEffect, useState } from "react";
import {
  getCommentsRequest,
  createCommentRequest,
  updateCommentRequest,
  deleteCommentRequest,
  forceDeleteCommentRequest,
} from "../api/Commentapi";
import type {
  Comment,
  CommentTarget,
  PaginationMeta,
} from "../types/comment/Comment";
import { normalizePaginatedComments } from "../types/comment/Comment";

const useComments = (target: CommentTarget) => {
  const targetKey =
    target.type === "post"
      ? `post-${target.post_id}`
      : `profile-${target.profile_user_id}`;

  const [comments, setComments] = useState<Comment[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchComments = useCallback(
    async (page = 1) => {
      if (page === 1) {
        setFetching(true);
      } else {
        setLoadingMore(true);
      }
      setError("");

      const response = await getCommentsRequest({ ...target, page });

      if (response.status === "success") {
        const { items, meta: newMeta } = normalizePaginatedComments(
          response.data
        );
        setComments((prev) =>
          page === 1 ? items : [...(Array.isArray(prev) ? prev : []), ...items]
        );
        setMeta(newMeta);
      } else {
        setError(response.message);
      }

      setFetching(false);
      setLoadingMore(false);
      // نعتمد على targetKey (قيمة أولية ثابتة) بدل target نفسه لأن target
      // ممكن يوصل كـ object literal جديد بكل render من المكوّن الأب،
      // وهذا يمنع إعادة إنشاء الدالة وإعادة الجلب بدون داعٍ
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [targetKey]
  );

  useEffect(() => {
    // جلب أولي عند تركيب المكوّن أو تغيّر الـ target — هذا هو الغرض
    // الأساسي من هذا الهوك، لذلك نتجاوز تحذير set-state-in-effect هنا
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments(1);
  }, [fetchComments]);

  async function addComment(text: string) {
    setSubmitting(true);
    setError("");

    const response = await createCommentRequest({ ...target, text });

    if (response.status === "success") {
      setComments((prev) => [
        response.data,
        ...(Array.isArray(prev) ? prev : []),
      ]);
    } else {
      setError(response.message);
    }

    setSubmitting(false);
    return response;
  }

  async function editComment(id: number, text: string) {
    setError("");
    const response = await updateCommentRequest(id, { text });

    if (response.status === "success") {
      setComments((prev) => prev.map((c) => (c.id === id ? response.data : c)));
    } else {
      setError(response.message);
    }

    return response;
  }

  async function removeComment(id: number, asAdmin: boolean = false) {
    setError("");

    const response = asAdmin
      ? await forceDeleteCommentRequest(id)
      : await deleteCommentRequest(id);

    if (response.status === "success") {
      setComments((prev) => prev.filter((c) => c.id !== id));
    } else {
      setError(response.message);
    }

    return response;
  }

  const hasMore = !!meta && meta.current_page < meta.last_page;

  function loadMore() {
    if (meta && hasMore) fetchComments(meta.current_page + 1);
  }

  return {
    comments,
    meta,
    fetching,
    loadingMore,
    submitting,
    error,
    hasMore,
    addComment,
    editComment,
    removeComment,
    loadMore,
  };
};

export default useComments;
