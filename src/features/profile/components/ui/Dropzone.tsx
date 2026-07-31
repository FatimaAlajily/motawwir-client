import { useRef } from "react";
import type { Dropzone } from "../../types/ui/Dropzone";

export function Dropzone({
  icon,
  title,
  subtitle,
  fileName,
  fileIcon,
  accept,
  onChange,
}: Dropzone) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-purple-300 hover:border-[#6C5CE7] bg-[#FAF8FF] hover:bg-purple-50/70 p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
    >
      <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-[#6C5CE7] text-[#6C5CE7] group-hover:text-white flex items-center justify-center transition-colors mb-3">
        {icon}
      </div>

      <span className="font-extrabold text-gray-900 text-base">
        {title}
      </span>
      
      <span className="text-xs text-gray-500 mt-1">
        {fileName ? (
          <span className="text-[#6C5CE7] font-bold flex items-center gap-1 justify-center">
            {fileIcon} {fileName}
          </span>
        ) : (
          subtitle || "اضغط لرفع الملف"
        )}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="hidden"
      />
    </div>
  );
}