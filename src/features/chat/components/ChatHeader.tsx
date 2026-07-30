import { MessageCircle } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center gap-4 p-2 bg-white border-b border border-[#a558ef] shadow-sm shrink-0">
      <div className="w-10 h-10 rounded-full bg-[#F4F0FF] flex items-center justify-center">
        <MessageCircle size={20} className="text-[#6620F3]" />
      </div>
      <div>
        <h2 className="font-bold text-[#111827]">الدردشة العالمية</h2>
      </div>
    </div>
  );
};

export default ChatHeader;
