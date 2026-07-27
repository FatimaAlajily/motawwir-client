import { useState } from "react";
import { useParams } from "react-router-dom";
import type { PostType } from "../types/common/PostType";
import useFetchPosts from "../hooks/useFetchPosts";
import PostCard from "../components/cards/PostCard";

const PostsPage = () => {
  const { type } = useParams<{ type: string }>();
  const [page, setPage] = useState(1);

  const validType = type as PostType;

  const { posts, loading, error, lastPage } = useFetchPosts(validType, page);

  if (loading) {
    return <p className="text-center text-gray-400 py-10">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        لا توجد منشورات في هذا القسم حتى الآن
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {lastPage > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-full text-sm font-semibold ${
                p === page
                  ? "bg-[#6620F3] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
