import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleSavePostRequest } from "../../api/PostApi";

type Props = {
  postId: number;
  initialSaved?: boolean;
  size?: number;
  className?: string;
};

export default function SaveButton({
  postId,
  initialSaved = false,
  size = 16,
  className = "",
}: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);

    // تحديث متفائل فوري (يحس المستخدم إن الضغطة اشتغلت لحظياً)،
    // ونرجّع الحالة القديمة لو فشل الطلب فعلياً
    const previous = saved;
    setSaved(!previous);

    const response = await toggleSavePostRequest(postId);

    if (response.status === "success") {
      setSaved(response.data.saved);
    } else {
      setSaved(previous);
    }

    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-pressed={saved}
      aria-label={saved ? "إلغاء حفظ المنشور" : "حفظ المنشور"}
      className={`transition-colors p-0.5 disabled:opacity-50 ${
        saved ? "text-[#6620F3]" : "text-gray-400 hover:text-[#6620F3]"
      } ${className}`}
    >
      <Bookmark size={size} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}