import { useState } from "react";
import { Newspaper } from "lucide-react";
import TabEmptyState from "./TabEmptyState";
import useFetchUserPosts from "../../../post/hooks/useFetchUserPosts";
import PostCard from "../../../post/components/cards/PostCard";
import Pagination from "../../../post/components/inputs/Pagination";

type Props = {
  profileUserId: number;
};

export default function NexusTab({ profileUserId }: Props) {
  const [page, setPage] = useState(1);
  const { posts, setPosts, meta, loading, error } = useFetchUserPosts(
    profileUserId,
    page
  );

  function handleDeleted(postId: number) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-24">
        <div className="w-8 h-8 border-3 border-purple-200 border-t-[#6C5CE7] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-center text-red-500 py-10">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-6">
        <TabEmptyState
          icon={<Newspaper size={32} />}
          title="منشوراتي"
          description="لا توجد منشورات خاصة بالمستخدم حالياً."
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDeleted={() => handleDeleted(post.id)}
            onEdit={() => {
              // التعديل مو مفعّل هنا حالياً — نفس وضع تاب الخزنة، عرض بس.
            }}
          />
        ))}
      </div>

      {meta && <Pagination meta={meta} onPageChange={setPage} />}
    </div>
  );
}