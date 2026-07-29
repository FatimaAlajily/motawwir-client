import { useState } from "react";
import { Send } from "lucide-react";
import type { InputProps } from "../../types/ui/Input";

export function Input({
  onSubmit,
  loading,
  placeholder = "اكتب تعليقاً...",
  initialValue = "",
  onCancel,
}: InputProps) {
  const [text, setText] = useState(initialValue);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || loading) return;

    const res = (await onSubmit(text.trim())) as { status?: string } | undefined;
    if (res?.status !== "error") {
      setText("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={1}
        className="flex-1 resize-none bg-[#EFEFF1] border border-purple-200 focus:border-[#6C5CE7] outline-none rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors"
      />
      <div className="flex items-center gap-1.5 pt-0.5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            إلغاء
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-11 h-11 rounded-xl bg-[#6C5CE7] hover:bg-[#5A4AD1] disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
}