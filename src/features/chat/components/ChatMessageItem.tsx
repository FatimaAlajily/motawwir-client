import { Trash2 } from "lucide-react";
import type { Message } from "../types/Message";

type ChatMessageItemProps = {
  msg: Message;
  isOwner: boolean;
  onDelete: (id: number) => void;
};

const ChatMessageItem = ({ msg, isOwner, onDelete }: ChatMessageItemProps) => {
  return (
    <div
      className={`flex items-start gap-2 w-fit max-w-[90%] ${
        isOwner ? "self-start flex-row" : "self-end flex-row-reverse"
      }`}
    >
      {/*------------- Avatar ------------ */}
      <img
        src={msg.user.avatar || "https://via.placeholder.com/40"}
        alt={msg.user.user_name}
        className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm ring-2 ring-white mt-1"
      />

      {/*---------- Content ----------- */}
      <div
        className={`flex flex-col max-w-[85%] ${
          isOwner ? "items-start" : "items-end"
        }`}
      >
        {/*-------------- Name Date -------------- */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-xs font-bold text-[#33373e]">
            {msg.user.user_name}
          </span>
          <span className="text-[10px] font-bold text-gray-400">
            {new Date(msg.created_at).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/*-------- Bubble Text -------------*/}
        <div
          className={`group relative px-4 py-2 rounded-2xl text-sm shadow-sm w-fit max-w-full border ${
            isOwner
              ? "bg-[#6620F3] text-white rounded-br-sm rounded-tl-sm "
              : "bg-white text-gray-800 rounded-bl-sm rounded-tr-sm border border-[#a558ef]"
          }`}
        >
          <p className="whitespace-pre-line wrap-break-word leading-relaxed">
            {msg.message}
          </p>

          {/* ----------- Delete Button ---------------*/}
          {isOwner && (
            <button
              type="button"
              onClick={() => onDelete(msg.id)}
              className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-violet-500 rounded-full p-1 shadow-md hover:text-violet-600"
              aria-label="حذف الرسالة"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
