import { useState, type ReactNode } from "react";
import { FolderKanban, ExternalLink, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProjectPost } from "../../types/kinds/ProjectPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { usePostComments } from "../../hooks/usePostComments";
import CommentSection from "../../../comment/components/common/CommentSection";
type ProjectPostCardProps = {
  post: ProjectPost;
  deleteAction?: ReactNode;
  isOwner?: boolean;
};

const VISIBLE_SKILLS_COUNT = 3;

const ProjectPostCard = ({
  post,
  deleteAction,
  isOwner,
}: ProjectPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const comments = usePostComments(post.id);
  const [votes, setVotes] = useState(post.votes);

  const visibleSkills = isExpanded
    ? post.skill
    : post.skill.slice(0, VISIBLE_SKILLS_COUNT);
  const remainingSkillsCount = Math.max(
    post.skill.length - VISIBLE_SKILLS_COUNT,
    0
  );

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden h-full flex flex-col"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Header -------- */}
      <PostHeader
        postId={post.id}
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
        showBookmark={true}
        extraAction={deleteAction}
      />

      {/* -------- Title & Badge -------- */}
      <div className="flex items-start gap-2 mb-2">
        <FolderKanban size={16} className="text-[#4B1E8A] mt-0.5 shrink-0" />
        <h3 className="text-[13px] font-bold text-motaweer flex-1">
          {post.title}
        </h3>
      </div>

      {/* -------- Project Image -------- */}
      {post.file && (
        <div className="mb-2.5 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
          <img
            src={post.file}
            alt={post.title}
            className="w-full h-44 object-cover"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* -------- Content -------- */}
        <div className="mb-2.5">
          <p
            className={`text-[11px] text-gray-700 leading-snug whitespace-pre-line wrap-break-word ${
              isExpanded ? "" : "line-clamp-1"
            }`}
          >
            {post.content}
          </p>
          {(post.content.length > 100 || remainingSkillsCount > 0) && (
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
            {!isExpanded && remainingSkillsCount > 0 && (
              <span className="text-[10px] font-bold text-[#6620F3]">
                +{remainingSkillsCount}
              </span>
            )}
          </div>
        )}

        {/* -------- Links -------- */}
        <div className="flex items-center gap-2 mt-auto mb-3">
          <a
            href={post.primary_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 flex-1 bg-[#6620F3] hover:bg-[#5a1cd8] text-white font-bold text-xs py-2 rounded-full transition-colors"
          >
            <FaGithub size={14} />
            الكود
          </a>

          {post.secondary_link && (
            <a
              href={post.secondary_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 flex-1 bg-[#F4F0FF] hover:bg-[#E5DEFF] text-[#6620F3] font-bold text-xs py-2 rounded-full transition-colors"
            >
              <ExternalLink size={14} />
              معاينة
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-100 mb-1.5" />
      <PostFooter
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

export default ProjectPostCard;