import { useState } from "react";
import { Bookmark, Bot, MessageCircle, MoveDown, MoveUp } from "lucide-react";

import type { QuestionPost } from "../../types/kinds/QuestionPost";
import { formatDate } from "../../../../shared/utils/formatDate";
import "../../../../styles/theme.css";

type QuestionPostCardProps = {
  post: QuestionPost;
};

const QuestionPostCard = ({ post }: QuestionPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-2 color-boarder shadow-sm hover:shadow-md transition-shadow linear-border w-full"
      style={{ fontFamily: "Tajawal" }}
    >
      {/* -------- Header -------- */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.user.avatar}
              alt={post.user.user_name}
              className="w-8 h-8 rounded-full object-cover ring ring-[#9723bb]"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-purple-600 border-2 border-white rounded-full" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span
              className="font-bold text-text-muted"
              style={{ fontFamily: "Tajawal" }}
            >
              {post.user.user_name}
            </span>
            <span className="text-[#6D6D6D] font-medium text-sm">
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="text-gray-400 hover:text-[#6620F3] transition-colors"
        >
          <Bookmark size={20} />
        </button>
      </div>

      {/* -------- Title -------- */}
      <h3 className="text-sm font-bold text-motaweer mb-1">{post.title}</h3>

      {/* -------- Content Row -------- */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="text-sm font-bold text-violet-900 shrink-0 mt-0.5">
            سؤال
          </span>

          <p
            className={`text-sm font-medium text-text-muted break-words min-w-0 flex-1 transition-all duration-300 ease-in-out ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {post.content}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="shrink-0 text-xs font-semibold text-[#6620F3] border border-[#6620F3] rounded-full px-3 py-1 hover:bg-[#e5e5f8] transition-colors"
        >
          {isExpanded ? "عرض أقل" : "رؤية المزيد"}
        </button>
      </div>

      <hr className="border-gray-100 mb-3" />

      {/* -------- Footer -------- */}
      <div className="flex items-center justify-center font-medium gap-7 text-sm text-[#6F7C8D]">
        <button className="flex items-center gap-1.5 hover:text-[#6620F3] transition-colors">
          <MoveUp size={16} className="text-[#4B1E8A]" />
          تصويت إيجابي ({post.votes.upvotes})
        </button>

        <button className="flex items-center gap-1.5 hover:text-[#6620F3] transition-colors">
          <MoveDown size={16} className="text-[#4B1E8A]" />
          تصويت سلبي ({post.votes.downvotes})
        </button>

        <div className="flex items-center gap-1.5">
          <Bot size={16} className="text-[#4B1E8A]" />
          ذكاء اصطناعي ({post.votes.ai})
        </div>

        <div className="flex items-center gap-1.5">
          <MessageCircle size={16} className="text-[#4B1E8A]" />
          الأجوبة
        </div>
      </div>
    </div>
  );
};

export default QuestionPostCard;
