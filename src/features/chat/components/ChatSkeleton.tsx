const ChatSkeleton = () => {
  return (
    <div
      dir="rtl"
      className="flex flex-col h-full bg-gray-50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Header Skeleton -------- */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-full bg-violet-100 animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 bg-violet-100 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></span>
            <div className="h-2 w-16 bg-gray-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* -------- Messages List Skeleton -------- */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
        {/* 1. Fake Incoming Message (يسار - متوسط) */}
        <div className="flex items-end gap-2 self-start flex-row">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
          <div className="flex flex-col items-start gap-1.5">
            <div className="h-2 w-20 bg-violet-100 rounded-full animate-pulse"></div>
            <div className="px-5 py-3 rounded-2xl rounded-bl-sm bg-white border border-gray-100 shadow-sm w-64 h-14 animate-pulse"></div>
          </div>
        </div>

        {/* 2. Fake Outgoing Message (يمين - طويل) */}
        <div className="flex items-end gap-2 self-end flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-[#F4F0FF] animate-pulse shrink-0"></div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-2 w-20 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="px-5 py-3 rounded-2xl rounded-br-sm bg-[#F4F0FF] border border-[#E5DEFF] w-80 h-16 animate-pulse"></div>
          </div>
        </div>

        {/* 3. Fake Incoming Message (يسار - قصير) */}
        <div className="flex items-end gap-2 self-start flex-row">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
          <div className="flex flex-col items-start gap-1.5">
            <div className="h-2 w-20 bg-violet-100 rounded-full animate-pulse"></div>
            <div className="px-5 py-3 rounded-2xl rounded-bl-sm bg-white border border-gray-100 shadow-sm w-40 h-10 animate-pulse"></div>
          </div>
        </div>

        {/* 4. Fake Outgoing Message (يمين - قصير) */}
        <div className="flex items-end gap-2 self-end flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-[#F4F0FF] animate-pulse shrink-0"></div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-2 w-20 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="px-5 py-3 rounded-2xl rounded-br-sm bg-[#F4F0FF] border border-[#E5DEFF] w-48 h-10 animate-pulse"></div>
          </div>
        </div>

        {/* 5. Fake Incoming Message (يسار - طويل) */}
        <div className="flex items-end gap-2 self-start flex-row">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
          <div className="flex flex-col items-start gap-1.5">
            <div className="h-2 w-24 bg-violet-100 rounded-full animate-pulse"></div>
            <div className="px-5 py-3 rounded-2xl rounded-bl-sm bg-white border border-gray-100 shadow-sm w-96 h-20 animate-pulse"></div>
          </div>
        </div>

        {/* 6. Fake Outgoing Message (يمين - متوسط) */}
        <div className="flex items-end gap-2 self-end flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-[#F4F0FF] animate-pulse shrink-0"></div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-2 w-20 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="px-5 py-3 rounded-2xl rounded-br-sm bg-[#F4F0FF] border border-[#E5DEFF] w-72 h-14 animate-pulse"></div>
          </div>
        </div>

        {/* 7. Fake Typing Indicator (مؤشر الكتابة) */}
        <div className="flex items-end gap-2 self-start flex-row">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
          <div className="px-5 py-4 rounded-2xl rounded-bl-sm bg-white border border-gray-100 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-violet-300 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* -------- Input Area Skeleton -------- */}
      <div className="flex items-center gap-2 p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex-1 h-12 rounded-full bg-gray-100 animate-pulse"></div>
        <div className="w-12 h-12 rounded-full bg-violet-200 animate-pulse shrink-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-white/50"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
