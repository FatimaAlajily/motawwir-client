import { useEffect, useState } from "react";
import { getPostsRequest } from "../api/PostApi";
import type { Post } from "../types/common/Post";
import type { PostType } from "../types/common/PostType";

const useFetchPosts = (type: PostType, page: number = 1) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [lastPage, setLastPage] = useState<number>(1);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      setLoading(true);
      setError("");

      const response = await getPostsRequest({ type, page });
      if (cancelled) return;

      if ("data" in response) {
        setPosts(response.data);
        setLastPage(response.meta.last_page);
      } else {
        setError(response.message);
      }

      setLoading(false);
    }

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, [type, page]);

  return { posts, loading, error, lastPage };
};

export default useFetchPosts;
