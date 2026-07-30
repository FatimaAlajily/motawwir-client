import { Send } from "lucide-react";

type ChatInputProps = {
  draft: string;
  setDraft: (val: string) => void;
  sending: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

const ChatInput = ({ draft, setDraft, sending, onSubmit }: ChatInputProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 p-4  border-gray-100 shrink-0"
    >
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="ارسل رسالة ..."
        maxLength={1000}
        className="flex-1 px-5 py-3 rounded-full bg-gray-100 border border-[#a558ef] text-sm focus:outline-none focus:ring-1 focus:ring-[#a558ef] transition-all"
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
  );
};

export default ChatInput;
