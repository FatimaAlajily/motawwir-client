import { Bot, MessageCircle, MoveDown, MoveUp } from "lucide-react";
import type { VoteDetails } from "../../../../shared/types/VoteDetails";
import useVote from "../../../votes/hooks/useVote";

type PostFooterProps = VoteDetails & {
  postId: number; 
  onVoteSuccess?: (votes: VoteDetails) => void; 
  showAI?: boolean;
  commentsLabel?: string;
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
    isOwner = false,
}: PostFooterProps) => {
    const { loading, handleVote } = useVote(postId);

    async function handleClick(custom: "upvote" | "downvote" | "ai") {
    if (loading && isOwner) return;
    const updatedVotes = await handleVote(custom);
    if (updatedVotes) {
      onVoteSuccess?.(updatedVotes);
    }
  }

  return (
    <div className="flex items-center justify-center font-medium gap-5 text-[10px] text-[#6F7C8D]">
      <button 
      type="button"
      onClick={() => handleClick("upvote")}
      disabled={loading || isOwner}
      className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        <MoveUp size={13} className="text-[#4B1E8A]" />
        دعم ({upvotes})
      </button>

      <button
      type="button"
        onClick={() => handleClick("downvote")}
        disabled={loading ||isOwner}
      className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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

      <div className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
        <MessageCircle size={13} className="text-[#4B1E8A]" />
        {commentsLabel}
      </div>
    </div>
  );
};

export default PostFooter;
