import { useState } from "react";
import type { Comment } from "../../types/comment/Comment";
import { CommentAvatar } from "../ui/Avatar";
import { Input } from "../ui/Input";
import { Bubble as CommentBubble } from "../ui/BubbleProps";
import { OptionsMenu } from "../ui/OptionsMenu";
import { Bot, MoveDown, MoveUp } from "lucide-react";
import { useAuthStore } from "../../../auth/store/useAuthStore";

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

  const currentUser = useAuthStore((state) => state.user);
  const isAdmin = currentUser?.role === "admin";
  const canManage = isOwner || isAdmin;

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
                <button className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
                  <MoveUp size={13} className="text-[#4B1E8A]" />
                  دعم (0)
                </button>

                <button className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
                  <MoveDown size={13} className="text-[#4B1E8A]" />
                  رفض (0)
                </button>

                <div className="flex items-center gap-1 hover:text-[#6620F3] transition-colors">
                  <Bot size={13} className="text-[#4B1E8A]" />
                  ذكاء اصطناعي (0)
                </div>
              </div>
            </>
          )}
        </CommentBubble>
      </div>
    </div>
  );
}
