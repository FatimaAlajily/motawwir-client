import { useState, type ReactNode } from "react";
import type { QuestionPost } from "../../types/kinds/QuestionPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import "../../../../styles/theme.css";
import { usePostComments } from "../../hooks/usePostComments";
import CommentSection from "../../../comment/components/common/CommentSection";

type QuestionPostCardProps = {
  post: QuestionPost;
  deleteAction?: ReactNode;
  isOwner?: boolean;
};

const QuestionPostCard = ({
  post,
  deleteAction,
  isOwner,
}: QuestionPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const comments = usePostComments(post.id);
  const [votes, setVotes] = useState(post.votes);

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-2xl p-2 color-boarder shadow-sm hover:shadow-md transition-shadow linear-border w-full overflow-hidden flex flex-col"
      style={{ fontFamily: "Tajawal" }}
    >
      {/* -------- Header -------- */}
      <PostHeader
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
        showBookmark={true}
        extraAction={deleteAction}
      />

      {/* -------- Title -------- */}
      <h3 className="text-xs font-bold text-motaweer mb-1">{post.title}</h3>

      {/* -------- Content Row -------- */}
      <div className="flex items-start justify-between gap-4 mb-2 w-full overflow-hidden">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="text-sm font-bold text-violet-900 shrink-0 mt-0.5">
            سؤال
          </span>

          <p
            className={`text-sm font-medium text-text-muted wrap-break-word min-w-0 flex-1 transition-all duration-300 ease-in-out ${
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
      <PostFooter
        postId={post.id}
        upvotes={votes.upvotes}
        downvotes={votes.downvotes}
        ai={votes.ai}
        commentsLabel="الأجوبة"
        onCommentsClick={comments.toggle}
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

export default QuestionPostCard;
