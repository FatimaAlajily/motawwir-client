import { useState } from "react";
import { Bookmark } from "lucide-react";
import type { NewPost } from "../../types/kinds/NewPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type NewPostCardProps = {
  post: NewPost;
};

const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg", "mov"];

function isVideoFile(url: string): boolean {
  const extension = url.split(".").pop()?.toLowerCase() ?? "";
  return VIDEO_EXTENSIONS.includes(extension);
}

const NewPostCard = ({ post }: NewPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasFile = Boolean(post.file);
  const isVideo = post.file ? isVideoFile(post.file) : false;

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Header -------- */}
      <div className="flex items-start justify-between mb-1.5 gap-2">
        <div className="flex-1 min-w-0">
          <PostHeader
            avatar={post.user.avatar}
            userName={post.user.user_name}
            createdAt={post.created_at}
            showBookmark={false}
          />
        </div>

        <button
          type="button"
          className="text-gray-400 hover:text-[#6620F3] transition-colors p-0.5 shrink-0"
        >
          <Bookmark size={15} />
        </button>
      </div>

      {/* -------- Title -------- */}
      <h3 className="text-[13px] font-bold text-motaweer leading-snug mb-1.5">
        {post.title}
      </h3>
      <a
        href={post.primary_link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] text-[#6620F3] hover:underline break-all block mb-2"
      >
        {post.primary_link}
      </a>

      {/* -------- Media Toggle -------- */}
      {hasFile && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-[11px] font-semibold text-[#6620F3] border border-[#6620F3] rounded-full px-2.5 py-0.5 mb-2 hover:bg-[#e5e5f8] transition-colors"
        >
          {isExpanded ? "إخفاء الوسائط" : "عرض الوسائط"}
        </button>
      )}

      {/* -------- Media (Image or Video) -------- */}
      {hasFile && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            isExpanded ? "grid-rows-[1fr] mb-2" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden min-w-0">
            {isVideo ? (
              <video
                src={post.file!}
                controls
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <img
                src={post.file!}
                alt={post.title}
                className="w-full h-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      )}

      <hr className="border-gray-100 mb-1.5" />

      {/* -------- Footer -------- */}
      <PostFooter
        upvotes={post.votes.upvotes}
        downvotes={post.votes.downvotes}
        ai={post.votes.ai}
        commentsLabel="الأجوبة"
      />
    </div>
  );
};

export default NewPostCard;
