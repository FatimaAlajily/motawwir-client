import { Pencil } from "lucide-react";
import type { PurpleInput } from "../../types/ui/PurpleInput";

export function PurpleInput({
  icon,
  value,
  onChange,
  placeholder,
  ltr = false,
  className = "",
}: PurpleInput) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && (
        <div className="absolute right-3.5 text-gray-500">
          {icon}
        </div>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full bg-[#FAF8FF] border border-purple-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-purple-100 rounded-xl py-3 pl-10 text-xs font-medium text-gray-900 transition-all outline-none ${
          icon ? "pr-10" : "pr-4"
        } ${
          ltr ? "dir-ltr text-left" : ""
        }`}
        placeholder={placeholder}
      />

      <Pencil
        size={15}
        className="absolute left-3 text-[#6C5CE7] transition-opacity peer-focus:opacity-0"
      />
    </div>
  );
}