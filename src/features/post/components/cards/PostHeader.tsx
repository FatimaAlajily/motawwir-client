import { Bookmark } from "lucide-react";
import type { ReactNode } from "react";
import { formatDate } from "../../../../shared/utils/formatDate";

type PostHeaderProps = {
  avatar: string;
  userName: string;
  createdAt: string;
  extraAction?: ReactNode;
  showBookmark?: boolean;
};

const PostHeader = ({
  avatar,
  userName,
  createdAt,
  extraAction,
  showBookmark = true,
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
            <button
              type="button"
              className="text-gray-400 hover:text-[#6620F3] transition-colors p-0.5"
            >
              <Bookmark size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
