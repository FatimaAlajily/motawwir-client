import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Comment } from "../../types/comment/Comment";
import { CommentAvatar } from "../ui/Avatar";
import { Input } from "../ui/Input";
import { Bubble as CommentBubble } from "../ui/BubbleProps"; // استيراد المكون بالاسم الجديد وتعديل مساره

type Props = {
  comment: Comment;
  isOwner: boolean;
  onEdit: (id: number, text: string) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
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

  async function handleEdit(text: string) {
    const res = (await onEdit(comment.id, text)) as { status?: string };
    if (res?.status !== "error") setIsEditing(false);
    return res;
  }

  async function handleDelete() {
    setIsDeleting(true);
    await onDelete(comment.id);
    setIsDeleting(false);
  }

  return (
    <div className="flex items-start gap-3 py-4">
      <CommentAvatar src={comment.user.avatar} alt={comment.user.user_name} />

      <div className="flex-1 min-w-0">
        <CommentBubble 
          userName={comment.user.user_name} 
          createdAt={timeAgo(comment.created_at)}
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
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-line break-words overflow-hidden">
              {comment.text}
            </p>
          )}
        </CommentBubble>

        {!isEditing && (
          <div className="flex items-center gap-4 px-2 mt-1.5">
            {isOwner && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-[#6C5CE7] transition-colors"
                >
                  <Pencil size={13} />
                  تعديل
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={13} />
                  {isDeleting ? "جاري الحذف..." : "حذف"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}