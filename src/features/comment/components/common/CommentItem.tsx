import { useState } from "react";
import type { Comment } from "../../types/comment/Comment";
import { CommentAvatar } from "../ui/Avatar";
import { Input } from "../ui/Input";
import { Bubble as CommentBubble } from "../ui/BubbleProps";
import { OptionsMenu } from "../ui/OptionsMenu";
import { Bot, MoveDown, MoveUp } from "lucide-react";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import useVote from "../../../votes/hooks/useVote";

type Props = {
  comment: Comment;
  isOwner: boolean;
  onEdit: (id: number, text: string) => Promise<unknown>;
  onDelete: (id: number, asAdmin?: boolean) => Promise<unknown>;
};

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} د`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `منذ ${hours} س`;

  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

export function CommentItem({ comment, isOwner, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [votes, setVotes] = useState(comment.votes);
  const { loading, handleVote } = useVote({
    type: "comment",
    id: comment.id,
  });

  const currentUser = useAuthStore((state) => state.user);
  const isAdmin = currentUser?.role === "admin";
  const canManage = isOwner || isAdmin;

  async function handleClick(custom: "upvote" | "downvote" | "ai") {
    if (loading || isOwner) return;

    const updatedVotes = await handleVote(custom);

    if (updatedVotes) {
      setVotes(updatedVotes);
    }
  }
  async function handleEdit(text: string) {
    const res = (await onEdit(comment.id, text)) as {
      status?: string;
    };

    if (res?.status !== "error") {
      setIsEditing(false);
    }

    return res;
  }

  async function handleDelete() {
    setIsDeleting(true);
    await onDelete(comment.id, !isOwner && isAdmin);
    setIsDeleting(false);
  }

  return (
    <div className="flex items-start gap-3 py-4">
      <CommentAvatar src={comment.user.avatar} alt={comment.user.user_name} />

      <div className="flex-1 min-w-0">
        <CommentBubble
          userName={comment.user.user_name}
          createdAt={timeAgo(comment.created_at)}
          actions={
            canManage && !isEditing ? (
              <OptionsMenu
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
                loading={isDeleting}
                asAdmin={!isOwner && isAdmin}
              />
            ) : undefined
          }
        >
          {isEditing ? (
            <div className="mt-2">
              <Input
                initialValue={comment.text}
                onSubmit={handleEdit}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              <p className="mt-1 whitespace-pre-line wrap-break-word text-sm text-gray-700">
                {comment.text}
              </p>

              <div className="flex items-center justify-start font-medium gap-4 text-[10px] text-[#6F7C8D] mt-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleClick("upvote")}
                  disabled={loading || isOwner}
                  className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50"
                >
                  <MoveUp size={13} className="text-[#4B1E8A]" />
                  دعم ({votes?.upvotes ?? 0})
                </button>

                <button
                  type="button"
                  onClick={() => handleClick("downvote")}
                  disabled={loading || isOwner}
                  className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50"
                >
                  <MoveDown size={13} className="text-[#4B1E8A]" />
                  رفض ({votes?.downvotes ?? 0})
                </button>

                <button
                  type="button"
                  onClick={() => handleClick("ai")}
                  disabled={loading || isOwner}
                  className="flex items-center gap-1 hover:text-[#6620F3] transition-colors disabled:opacity-50"
                >
                  <Bot size={13} className="text-[#4B1E8A]" />
                  ذكاء اصطناعي ({votes?.ai ?? 0})
                </button>
              </div>
            </>
          )}
        </CommentBubble>
      </div>
    </div>
  );
}
