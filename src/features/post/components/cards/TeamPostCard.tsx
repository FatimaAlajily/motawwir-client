import { useState } from "react";
import { Bookmark, ArrowLeft } from "lucide-react";
import type { TeamPost } from "../../types/kinds/TeamPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type TeamPostCardProps = {
  post: TeamPost;
};

const VISIBLE_SKILLS_COUNT = 4;

const TeamPostCard = ({ post }: TeamPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleSkills = isExpanded
    ? post.skill
    : post.skill.slice(0, VISIBLE_SKILLS_COUNT);

  const remainingCount = Math.max(post.skill.length - VISIBLE_SKILLS_COUNT, 0);

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Title -------- */}
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-[13px] font-bold text-motaweer">{post.title}</h3>

        <button
          type="button"
          className="text-gray-400 hover:text-[#6620F3] transition-colors p-0.5 shrink-0"
        >
          <Bookmark size={15} />
        </button>
      </div>

      {/* -------- User Header -------- */}
      <PostHeader
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
        showBookmark={false}
      />

      {/* -------- Content -------- */}
      <p className="text-[11px] text-gray-700 leading-snug whitespace-pre-line wrap-break-word mb-2">
        {post.content}
      </p>

      {/* -------- Skills -------- */}
      <div className="mb-2">
        {isExpanded && (
          <h4 className="text-[10px] font-bold text-[#6620F3] mb-1">
            المهارات
          </h4>
        )}

        <div className="flex flex-wrap items-center gap-1">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="
                border border-[#8A2BE2]
                text-[#4b1e8a]
                bg-white
                text-[10px]
                font-semibold
                px-2
                py-px
                rounded-full
              "
            >
              {skill}
            </span>
          ))}

          {post.skill.length > VISIBLE_SKILLS_COUNT && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                text-[10px]
                font-bold
                text-[#6620F3]
                hover:underline
              "
            >
              {isExpanded ? "عرض أقل" : `+${remainingCount} أخرى`}
            </button>
          )}
        </div>
      </div>

      {/* -------- Join Button -------- */}
      {post.primary_link && (
        <a
          href={post.primary_link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            justify-center
            gap-1.5
            w-full
            bg-[#6620F3]
            hover:bg-[#5a1cd8]
            text-white
            font-bold
            text-xs
            py-1.5
            rounded-full
            transition-colors
            mb-2
          "
        >
          الانضمام
          <ArrowLeft size={15} />
        </a>
      )}

      <hr className="border-gray-100 mb-1.5" />

      {/* -------- Footer -------- */}
      <PostFooter
        upvotes={post.votes.upvotes}
        downvotes={post.votes.downvotes}
        ai={post.votes.ai}
        showAI={false}
        commentsLabel="التعليقات"
      />
    </div>
  );
};

export default TeamPostCard;
