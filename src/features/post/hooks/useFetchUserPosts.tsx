import { useEffect, useState } from "react";
import { getPostsRequest } from "../api/PostApi";
import type { Post } from "../types/common/Post";
import type { PostPagination } from "../types/forms/PostPagination";

const useFetchUserPosts = (userId?: number, page: number = 1) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PostPagination<Post>["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // لو ما فيه userId، نصفّر الحالة مباشرة — هذا جزء من الغرض الأساسي
    // لهذا الـ effect (مزامنة القائمة مع الـ userId)، فنتجاوز التحذير هنا
    if (!userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosts([]);
   
      setMeta(null);
   
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchUserPosts() {
      setLoading(true);
      setError("");

      const response = await getPostsRequest({ user_id: userId, page });
      if (cancelled) return;

      if ("data" in response) {
        setPosts(response.data);
        setMeta(response.meta);
      } else {
        setError(response.message);
      }

      setLoading(false);
    }

    // جلب المنشورات عند تركيب المكوّن أو تغيّر userId/page — هذا هو الغرض
    // الأساسي من هذا الهوك، لذلك نتجاوز تحذير set-state-in-effect هنا
 
    fetchUserPosts();

    return () => {
      cancelled = true;
    };
  }, [userId, page]);

  return { posts, setPosts, meta, loading, error };
};

export default useFetchUserPosts;