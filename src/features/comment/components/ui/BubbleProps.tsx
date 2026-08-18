import type { BubbleProps } from "../../types/ui/Bubble";

export function Bubble({
  userName,
  createdAt,
  children,
  actions,
}: BubbleProps) {
  return (
    <div className="inline-block w-fit max-w-full bg-[#FAF5F5] border border-purple-100 rounded-2xl px-4 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">
            {userName}
          </span>

          <span className="text-xs text-gray-400">
            {createdAt}
          </span>
        </div>

        {actions}
      </div>

      {children}
    </div>
  );
}