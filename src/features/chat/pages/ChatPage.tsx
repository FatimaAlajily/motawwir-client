import { useEffect, useRef, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import { useAuthStore } from "../../auth/store/useAuthStore";
import useChatMessages from "../hooks/useGlobalChat";
import useDeleteMessage from "../hooks/useDeleteMessage";
import ChatHeader from "../components/ChatHeader";
import ChatMessageItem from "../components/ChatMessageItem";
import ChatInput from "../components/ChatInput";
import ChatSkeleton from "../components/ChatSkeleton";

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
    return <ChatSkeleton />;
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-full text-red-500"
        style={{ fontFamily: "'Tajawal', sans-serif" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col h-full bg-gray-50 rounded-2xl border  border-[#a558ef] shadow-sm overflow-hidden"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/*--------------- Headder section ---------- */}
      <ChatHeader />

      {/* -------------- Message List ------------*/}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            msg={msg}
            isOwner={currentUser?.id === msg.user.id}
            onDelete={onDelete}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/*---------- Input ------------- */}
      <ChatInput
        draft={draft}
        setDraft={setDraft}
        sending={sending}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChatPage;
