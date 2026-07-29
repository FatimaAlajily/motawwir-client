import type { ListProps } from "../../types/ui/List";
import { CommentItem } from "../common/CommentItem";

export function List({
  comments = [],
  currentUserId,
  onEdit,
  onDelete,
  onLoadMore,
  loadingMore,
}: ListProps) {
  // مراقبة التمرير للوصول إلى القاع
  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // إذا وصل المستخدم لنهاية الصندوق (باقي 20 بكسل) ولم يتم التحميل حالياً
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      if (onLoadMore && !loadingMore) {
        onLoadMore();
      }
    }
  }

  if (!Array.isArray(comments) || comments.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 py-10">
        لا توجد تعليقات بعد، كن أول من يعلّق
      </p>
    );
  }

  return (
    <div
      onScroll={handleScroll}
      className="max-h-[500px] overflow-y-auto divide-y divide-gray-100 pr-2 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-purple-300"
    >
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isOwner={comment.user.id === currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {loadingMore && (
        <div className="text-center text-xs font-bold text-[#6C5CE7] py-3">
          جاري تحميل التعليقات القديمة...
        </div>
      )}
    </div>
  );
}