import { Upload, X } from "lucide-react";
import type { FileDropInputProps } from "../types/FileDropInputProps";

export const FileDropInput = ({
  label,
  file,
  onChange,
  accept = ".jpg,.jpeg,.png,.gif,.mp4,.pdf,.doc,.docx",
  required,
}: FileDropInputProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">{label}</label>

    {file ? (
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 text-sm">
        <span className="truncate">{file.name}</span>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-gray-400 hover:text-red-600"
        >
          <X size={16} />
        </button>
      </div>
    ) : (
      <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#4b1e8a] cursor-pointer text-sm text-gray-500">
        <Upload size={16} />
        اختر ملفًا
        <input
          type="file"
          accept={accept}
          required={required}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>
    )}
  </div>
);
