import { useEffect, useState } from "react";
import { getPostsRequest } from "../api/PostApi";
import type { Post } from "../types/common/Post";
import type { PostType } from "../types/common/PostType";
import type { PostPagination } from "../types/forms/PostPagination";

const useFetchPosts = (
  type: PostType,
  page: number = 1,
  search: string = ""
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PostPagination<Post>["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      setLoading(true);
      setError("");

      const response = await getPostsRequest({
        type,
        page,
        search: search || undefined,
      });
      if (cancelled) return;

      if ("data" in response) {
        setPosts(response.data);
        setMeta(response.meta);
      } else {
        setError(response.message);
      }

      setLoading(false);
    }

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, [type, page, search]);

  return { posts, setPosts, meta, loading, error };
};

export default useFetchPosts;
