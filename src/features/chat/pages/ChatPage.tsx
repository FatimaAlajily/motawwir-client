import { useEffect, useRef, useState } from "react";
import { Send, Trash2, MessageCircle } from "lucide-react";
import useSendMessage from "../hooks/useSendMessage";
import { useAuthStore } from "../../auth/store/useAuthStore";
import useChatMessages from "../hooks/useGlobalChat";
import useDeleteMessage from "../hooks/useDeleteMessage";

const ChatPage = () => {
  const { messages, setMessages, loading, error } = useChatMessages();
  const { loading: sending, handleSend } = useSendMessage();
  const { handleDelete } = useDeleteMessage();
  const currentUser = useAuthStore((state) => state.user);

  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || sending) return;

    const text = draft;
    setDraft("");

    const newMessage = await handleSend(text);

    if (newMessage) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    }
  }

  async function onDelete(id: number) {
    const success = await handleDelete(id);
    if (success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        جاري تحميل الرسائل...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col h-full bg-gray-50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Header -------- */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#F4F0FF] flex items-center justify-center">
          <MessageCircle size={20} className="text-[#6620F3]" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">الدردشة العالمية</h2>
          <p className="text-xs text-green-500 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            متصل الآن
          </p>
        </div>
      </div>

      {/* -------- Messages List -------- */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
        {messages.map((msg) => {
          const isOwner = currentUser?.id === msg.user.id;

          return (
            // تحديد اتجاه الرسالة: رسائلك يمين، رسائل الآخرين يسار
            <div
              key={msg.id}
              className={`flex items-start gap-2 max-w-full ${
                isOwner
                  ? "justify-start flex-row"
                  : "justify-end flex-row-reverse"
              }`}
            >
              {/* الأفاتار */}
              <img
                src={msg.user.avatar || "https://via.placeholder.com/40"}
                alt={msg.user.user_name}
                className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm ring-2 ring-white mt-1"
              />

              {/* حاوية المحتوى (الاسم + التاريخ + الفقاعة) */}
              <div
                className={`flex flex-col max-w-[75%] ${isOwner ? "items-start" : "items-end"}`}
              >
                {/* الاسم والتاريخ (خارج الفقاعة) */}
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-bold text-[#6620F3]">
                    {msg.user.user_name}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(msg.created_at).toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* فقاعة النص */}
                <div
                  className={`group relative px-4 py-2 rounded-2xl text-sm shadow-sm w-fit max-w-full ${
                    isOwner
                      ? "bg-[#6620F3] text-white rounded-tr-sm"
                      : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-line break-words leading-relaxed">
                    {msg.message}
                  </p>

                  {/* زر الحذف للرسائل الخاصة */}
                  {isOwner && (
                    <button
                      type="button"
                      onClick={() => onDelete(msg.id)}
                      className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-red-500 rounded-full p-1 shadow-md hover:text-red-600"
                      aria-label="حذف الرسالة"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* -------- Input Area -------- */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 p-4 bg-white border-t border-gray-100 shrink-0"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          maxLength={1000}
          className="flex-1 px-5 py-3 rounded-full bg-gray-100 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#dfd2f14a] transition-all"
        />
        <button
          type="submit"
          disabled={sending || !draft.trim()}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#6620F3] hover:bg-[#5a1cd8] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-md"
          aria-label="إرسال"
        >
          {sending ? (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
