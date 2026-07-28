import { useState } from "react";
import { useParams } from "react-router-dom";
import type { PostType } from "../types/common/PostType";
import useFetchPosts from "../hooks/useFetchPosts";
import PostCard from "../components/cards/PostCard";
import type { Post } from "../types/common/Post";
import EditPostModal from "../components/ui/EditPostModal";
import { usePostSearchStore } from "../../../shared/store/usePostSearchStore";
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue";
import Pagination from "../components/inputs/Pagination";
import LOADING_IMAGE from "../../../assets/images/rabitloadingsearch.png";
import NO_RESULTS_IMAGE from "../../../assets/images/noresultfound.png";
import SkeletonCard from "../components/loading/SkeletonCard";

const PostsPage = () => {
  const { type } = useParams<{ type: string }>();
  const [page, setPage] = useState(1);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const validType = type as PostType;

  const rawSearchQuery = usePostSearchStore((state) => state.query);
  const searchQuery = useDebouncedValue(rawSearchQuery, 400);

  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setPage(1);
  }

  const { posts, setPosts, meta, loading, error } = useFetchPosts(
    validType,
    page,
    searchQuery
  );

  const isSearching = searchQuery.trim().length > 0;

  function handlePostDeleted(deletedId: number) {
    setPosts((prev) => prev.filter((p) => p.id !== deletedId));
  }

  function handlePostUpdated(updatedPost: Post) {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    setEditingPost(null);
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (loading && isSearching) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <img
          src={LOADING_IMAGE}
          alt="جاري البحث"
          className="w-48 h-48 object-contain mb-4 animate-pulse"
        />
        <p className="text-gray-500 font-semibold text-sm">جاري البحث...</p>
      </div>
    );
  }

  // if (posts.length === 0) {
  //   return (
  //     <p className="text-center text-gray-400 py-10">
  //       لا توجد منشورات في هذا القسم حتى الآن
  //     </p>
  //   );
  // }

  if (!loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <img
          src={NO_RESULTS_IMAGE}
          alt="لا توجد نتائج"
          className="w-48 h-48 object-contain mb-4"
        />
        <p className="text-gray-500 font-semibold text-sm">
          {isSearching
            ? "لم يتم إيجاد نتائج مطابقة لبحثك"
            : "لا توجد منشورات في هذه الصفحة حتى الآن"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-6 gap-4 ">
        {loading && !isSearching
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDeleted={() => handlePostDeleted(post.id)}
                onEdit={(p) => setEditingPost(p)}
              />
            ))}
      </div>

      {!loading && meta && <Pagination meta={meta} onPageChange={setPage} />}

      <EditPostModal
        post={editingPost}
        onClose={() => setEditingPost(null)}
        onUpdated={handlePostUpdated}
      />
    </>
  );
};

export default PostsPage;
