import useComments from "../../hooks/useComments";
import type { CommentTarget } from "../../types/comment/Comment";
import { Input } from "../ui/Input";
import { List } from "../ui/List";
import { useAuthStore } from "../../../auth/store/useAuthStore";

type Props = {
  target: CommentTarget;
  currentUserId?: number;
};

export default function CommentSection({ target, currentUserId }: Props) {
  const currentUser = useAuthStore((state) => state.user);
  const isLogged = Boolean(currentUserId || currentUser);

  const {
    comments,
    fetching,
    loadingMore,
    submitting,
    error,
    addComment,
    editComment,
    removeComment,
    loadMore,
  } = useComments(target);

  return (
    <div className="bg-white border border-purple-100/80 rounded-3xl p-5" dir="rtl">
      <h3 className="text-sm font-bold text-gray-900 mb-4 text-right">التعليقات</h3>

      {/* التحقق من حالة المستخدم: إذا كان مسجلاً يظهر حقل الإدخال، وإذا كان زائراً تظهر رسالة تنبيهية فقط دون توجيه إجباري */}
      {isLogged ? (
        <Input onSubmit={addComment} loading={submitting} />
      ) : (
        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 text-center mb-4">
          <p className="text-xs text-red-500 font-medium">
            يجب <span className="font-bold underline">تسجيل الدخول</span> لنشر تعليق جديد.
          </p>
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-medium mt-2">{error}</p>}

      {fetching ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-purple-200 border-t-[#6C5CE7] rounded-full animate-spin" />
        </div>
      ) : (
        <List
          comments={comments}
          currentUserId={currentUserId}
          onEdit={editComment}
          onDelete={removeComment}
          onLoadMore={loadMore}
          loadingMore={loadingMore}
        />
      )}
    </div>
  );
}