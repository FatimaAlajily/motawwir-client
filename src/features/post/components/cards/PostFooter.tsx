import { useState } from "react";
import { Bot, MessageCircle, MoveDown, MoveUp } from "lucide-react";
import type { VoteDetails } from "../../../../shared/types/VoteDetails";
import useVote from "../../../votes/hooks/useVote";
import { useAuthStore } from "../../../auth/store/useAuthStore";

type PostFooterProps = VoteDetails & {
  postId: number;
  onVoteSuccess?: (votes: VoteDetails) => void;
  showAI?: boolean;
  commentsLabel?: string;
  onCommentsClick?: () => void; // جديد
  isOwner?: boolean;
};

const PostFooter = ({
  postId,
  upvotes,
  downvotes,
  ai,
  onVoteSuccess,
  showAI = true,
  commentsLabel = "الأجوبة",
  onCommentsClick,
  isOwner = false,
}: PostFooterProps) => {
  const { loading, handleVote } = useVote({
    type: "post",
    id: postId,
  });

  const [voteMessage, setVoteMessage] = useState("");
  const currentUser = useAuthStore((state) => state.user);

  function showGuestMessage() {
    setVoteMessage("يجب تسجيل الدخول للتصويت");
    setTimeout(() => setVoteMessage(""), 3000);
  }

  async function handleClick(custom: "upvote" | "downvote" | "ai") {
    if (!currentUser) {
      showGuestMessage();
      return;
    }

    if (loading || isOwner) return;

    const updatedVotes = await handleVote(custom);
    if (updatedVotes) {
      onVoteSuccess?.(updatedVotes);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center justify-center font-medium gap-5 text-[10px] text-[#6F7C8D]">
        <button
          type="button"
          onClick={() => handleClick("upvote")}
          disabled={loading || isOwner}
          className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MoveUp size={13} className="text-[#4B1E8A]" />
          دعم ({upvotes})
        </button>

        <button
          type="button"
          onClick={() => handleClick("downvote")}
          disabled={loading || isOwner}
          className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MoveDown size={13} className="text-[#4B1E8A]" />
          رفض({downvotes})
        </button>

        {showAI && (
          <button
            type="button"
            onClick={() => handleClick("ai")}
            disabled={loading || isOwner}
            className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Bot size={13} className="text-[#4B1E8A]" />
            ذكاء اصطناعي ({ai})
          </button>
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

      {voteMessage && (
        <p className="text-[11px] text-red-500">{voteMessage}</p>
      )}
    </div>
  );
};

export default PostFooter;