import { useEffect, useState } from "react";
import { getSavedPostsRequest } from "../api/PostApi";
import type { Post } from "../types/common/Post";
import type { PostPagination } from "../types/forms/PostPagination";

const useFetchSavedPosts = (page: number = 1) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PostPagination<Post>["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function fetchSavedPosts() {
      setLoading(true);
      setError("");

      const response = await getSavedPostsRequest({ page });
      if (cancelled) return;

      if ("data" in response) {
        setPosts(response.data);
        setMeta(response.meta);
      } else {
        setError(response.message);
      }

      setLoading(false);
    }

    fetchSavedPosts();

    return () => {
      cancelled = true;
    };
  }, [page]);

  return { posts, setPosts, meta, loading, error };
};

export default useFetchSavedPosts;