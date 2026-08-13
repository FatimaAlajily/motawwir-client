import type { ReactNode } from "react";
import { formatDate } from "../../../../shared/utils/formatDate";
import SaveButton from "../ui/SaveButton";

type PostHeaderProps = {
  postId: number;
  avatar: string;
  userName: string;
  createdAt: string;
  extraAction?: ReactNode;
  showBookmark?: boolean;
  initialSaved?: boolean;
};

const PostHeader = ({
  postId,
  avatar,
  userName,
  createdAt,
  extraAction,
  showBookmark = true,
  initialSaved = false,
}: PostHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={avatar}
            alt={userName}
            className="w-6 h-6 rounded-full object-cover ring ring-[#9723bb]"
          />
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-600 border border-white rounded-full" />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span
            className="font-bold text-text-muted"
            style={{ fontFamily: "Tajawal" }}
          >
            {userName}
          </span>
          <span className="text-[#6D6D6D] font-medium text-xs">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {(showBookmark || extraAction) && (
        <div className="flex items-center gap-0.5 shrink-0">
          {extraAction}
          {showBookmark && (
            <SaveButton postId={postId} initialSaved={initialSaved} />
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;