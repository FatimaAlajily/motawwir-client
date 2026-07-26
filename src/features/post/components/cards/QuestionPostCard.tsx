import { useState } from "react";

import type { QuestionPost } from "../../types/kinds/QuestionPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type QuestionPostCardProps = {
  post: QuestionPost;
};

const QuestionPostCard = ({ post }: QuestionPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-2xl p-2 color-boarder shadow-sm hover:shadow-md transition-shadow linear-border w-full overflow-hidden"
      style={{ fontFamily: "Tajawal" }}
    >
      {/* -------- Header -------- */}
      <PostHeader
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
      />

      {/* -------- Title -------- */}
      <h3 className="text-sm font-bold text-motaweer mb-1">{post.title}</h3>

      {/* -------- Content Row -------- */}
      <div className="flex items-start justify-between gap-4 mb-2 w-full overflow-hidden">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="text-sm font-bold text-violet-900 shrink-0 mt-0.5">
            سؤال
          </span>

          <p
            className={`text-sm font-medium text-text-muted break-all min-w-0 flex-1 transition-all duration-300 ease-in-out ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {post.content}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="shrink-0 text-xs font-semibold text-[#6620F3] border border-[#6620F3] rounded-full px-3 py-1 min-w-[90px] text-center hover:bg-[#e5e5f8] transition-colors"
        >
          {isExpanded ? "عرض أقل" : "رؤية المزيد"}
        </button>
      </div>

      <hr className="border-gray-100 mb-3" />

      {/* -------- Footer -------- */}
      <PostFooter
        upvotes={post.votes.upvotes}
        downvotes={post.votes.downvotes}
        ai={post.votes.ai}
        // commentsCount={post.votes.comments_count} // يمكنك تفعيله إذا كان متوفراً
      />
    </div>
  );
};

export default QuestionPostCard;
