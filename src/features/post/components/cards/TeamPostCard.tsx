import { useState, type ReactNode } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import type { TeamPost } from "../../types/kinds/TeamPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import SaveButton from "../ui/SaveButton";
import { usePostComments } from "../../hooks/usePostComments";
import CommentSection from "../../../comment/components/common/CommentSection";

type TeamPostCardProps = {
  post: TeamPost;
  deleteAction?: ReactNode;
  isOwner?: boolean;
};

const VISIBLE_SKILLS_COUNT = 3;

const TeamPostCard = ({ post, deleteAction, isOwner }: TeamPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const comments = usePostComments(post.id);
  const [votes, setVotes] = useState(post.votes);

  const visibleSkills = isExpanded
    ? post.skill
    : post.skill.slice(0, VISIBLE_SKILLS_COUNT);

  const remainingCount = Math.max(post.skill.length - VISIBLE_SKILLS_COUNT, 0);

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden h-full flex flex-col"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Title -------- */}
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-[13px] font-bold text-motaweer">{post.title}</h3>

        <SaveButton postId={post.id} size={15} className="shrink-0" />
      </div>

      {/* -------- User Header -------- */}
      <PostHeader
        postId={post.id}
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
        showBookmark={false}
        extraAction={deleteAction}
      />

      <div className="flex-1 flex flex-col">
        {/* -------- Content -------- */}
        <div className="mb-2.5">
          <p
            className={`text-[11px] text-gray-700 leading-snug whitespace-pre-line wrap-break-word ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {post.content}
          </p>

          {(post.content.length > 60 || remainingCount > 0) && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[10px] font-bold text-[#6620F3] hover:underline mt-1"
            >
              {isExpanded ? "عرض أقل" : "عرض المزيد"}
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* -------- Skills -------- */}
        {post.skill && post.skill.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-2.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-semibold text-[#4b1e8a] bg-[#F4F0FF] px-2 py-0.5 rounded-full border-0"
              >
                {skill}
              </span>
            ))}
            {!isExpanded && remainingCount > 0 && (
              <span className="text-[10px] font-bold text-[#6620F3]">
                +{remainingCount}
              </span>
            )}
          </div>
        )}

        {/* -------- Join Button -------- */}
        <div className="mt-auto mb-2.5">
          {post.primary_link && (
            <a
              href={post.primary_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-52 mx-auto bg-[#6620F3] hover:bg-[#5a1cd8] text-white font-bold text-xs py-1.5 rounded-full transition-colors"
            >
              الانضمام
              <ArrowLeft size={15} />
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-100 mb-1.5" />

      {/* -------- Footer -------- */}
      <PostFooter
        showAI={false}
        commentsLabel="التعليقات"
        onCommentsClick={comments.toggle}
        postId={post.id}
        upvotes={votes.upvotes}
        downvotes={votes.downvotes}
        ai={votes.ai}
        onVoteSuccess={setVotes}
        isOwner={isOwner}
      />
      {comments.show && (
        <>
          <hr className="border-gray-100 my-2" />
          <CommentSection
            target={comments.target}
            currentUserId={comments.currentUserId}
          />
        </>
      )}
    </div>
  );
};

export default TeamPostCard;