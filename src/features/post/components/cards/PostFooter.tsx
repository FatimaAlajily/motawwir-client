import { Bot, MessageCircle, MoveDown, MoveUp } from "lucide-react";
import type { VoteDetails } from "../../../../shared/types/VoteDetails";

const PostFooter = ({
  upvotes,
  downvotes,
  ai,
}: //   commentsCount,
VoteDetails) => {
  return (
    <div className="flex items-center justify-center font-medium gap-7 text-sm text-[#6F7C8D]">
      <button className="flex items-center gap-1.5 hover:text-[#6620F3] transition-colors">
        <MoveUp size={16} className="text-[#4B1E8A]" />
        تصويت إيجابي ({upvotes})
      </button>

      <button className="flex items-center gap-1.5 hover:text-[#6620F3] transition-colors">
        <MoveDown size={16} className="text-[#4B1E8A]" />
        تصويت سلبي ({downvotes})
      </button>

      <div className="flex items-center gap-1.5 hover:text-[#6620F3] transition-colors">
        <Bot size={16} className="text-[#4B1E8A]" />
        ذكاء اصطناعي ({ai})
      </div>

      <div className="flex items-center gap-1.5 hover:text-[#6620F3] transition-colors">
        <MessageCircle size={16} className="text-[#4B1E8A]" />
        الأجوبة
        {/* نعرض عدد التعليقات فقط إذا تم تمريره */}
        {/* {commentsCount !== undefined && ` (${commentsCount})`} */}
      </div>
    </div>
  );
};

export default PostFooter;
