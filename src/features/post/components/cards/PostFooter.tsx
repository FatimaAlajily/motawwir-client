import { Bot, MessageCircle, MoveDown, MoveUp } from "lucide-react";
import type { VoteDetails } from "../../../../shared/types/VoteDetails";

type PostFooterProps = VoteDetails & {
  showAI?: boolean;
  commentsLabel?: string;
  onCommentsClick?: () => void; // جديد
};

const PostFooter = ({
  upvotes,
  downvotes,
  ai,
  showAI = true,
  commentsLabel = "الأجوبة",
  onCommentsClick,
}: PostFooterProps) => {
  return (
    <div className="flex items-center justify-center font-medium gap-5 text-[10px] text-[#6F7C8D]">
      <button className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
        <MoveUp size={13} className="text-[#4B1E8A]" />
        دعم ({upvotes})
      </button>

      <button className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
        <MoveDown size={13} className="text-[#4B1E8A]" />
        رفض({downvotes})
      </button>

      {showAI && (
        <div className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
          <Bot size={13} className="text-[#4B1E8A]" />
          ذكاء اصطناعي ({ai})
        </div>
      )}

      <button
        type="button"
        onClick={onCommentsClick}
        className="flex items-center gap-1 hover:text-[#6620F3] transition-colors"
      >
        <MessageCircle size={13} className="text-[#4B1E8A]" />
        {commentsLabel}
      </button>
    </div>
  );
};

export default PostFooter;