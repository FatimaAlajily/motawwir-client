import type { Comment } from "../../types/comment/Comment";
import { CommentItem } from "./CommentItem";

type Props = {
  comments?: Comment[]; // جعلناها اختيارية لحماية إضافية
  currentUserId?: number;
  onEdit: (id: number, text: string) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
};

export function CommentList({ comments = [], currentUserId, onEdit, onDelete }: Props) {
  // حماية إضافية في حال لم تكن مصفوفة
  if (!Array.isArray(comments) || comments.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 py-10">
        لا توجد تعليقات بعد، كن أول من يعلّق
      </p>
    );
  }

  

  return (
    <div className="divide-y divide-gray-100">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwner={comment.user.id === currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}