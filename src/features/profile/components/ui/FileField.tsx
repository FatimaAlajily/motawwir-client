import { UploadCloud, FileText } from "lucide-react";
import { useRef, useState } from "react";
import type { FileFieldProps } from "../../types/ui/FileField";

export function FileField({
  label,
  onChange,
  accept,
  currentFileName,
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-900 mb-2.5 text-right">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-purple-300 hover:border-[#6C5CE7] bg-[#FAF8FF] hover:bg-purple-50/70 p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
      >
        <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-[#6C5CE7] text-[#6C5CE7] group-hover:text-white flex items-center justify-center transition-colors mb-3">
          <UploadCloud size={28} />
        </div>

        <span className="font-extrabold text-gray-900 text-base">
          ارفع السيرة الذاتية هنا
        </span>
        <span className="text-xs text-gray-500 mt-1">
          {fileName ? (
            <span className="text-[#6C5CE7] font-bold flex items-center gap-1 justify-center">
              <FileText size={15} /> {fileName}
            </span>
          ) : (
            "أو اضغط لرفع ملف PDF"
          )}
        </span>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFileName(file.name);
              onChange(file);
            }
          }}
          className="hidden"
        />
      </div>

      {currentFileName && !fileName && (
        <a
          href={currentFileName}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-purple-700 underline block text-right"
        >
          عرض الملف الحالي
        </a>
      )}
    </div>
  );
}