import { Bookmark } from "lucide-react";
import { formatDate } from "../../../../shared/utils/formatDate";
import type { ReactNode } from "react";

type PostHeaderProps = {
  avatar: string;
  userName: string;
  createdAt: string;
  extraAction?: ReactNode;
};

const PostHeader = ({ avatar, userName, createdAt }: PostHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover ring ring-[#9723bb]"
          />
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-purple-600 border-2 border-white rounded-full" />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span
            className="font-bold text-text-muted"
            style={{ fontFamily: "Tajawal" }}
          >
            {userName}
          </span>
          <span className="text-[#6D6D6D] font-medium text-sm">
            {formatDate(createdAt)}
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
  );
};

export default PostHeader;
