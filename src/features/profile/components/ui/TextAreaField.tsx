import { Pencil } from "lucide-react";
import type { TextArea } from "../../types/ui/TextArea";

export function TextAreaField({
  label,
  placeholder,
  value,
  rows = 4,
  required = false,
  onChange,
}: TextArea) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-gray-900 mb-2.5 text-right">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          placeholder={placeholder}
          rows={rows}
          required={required}
          onChange={onChange}
          className="peer w-full bg-[#FAF8FF] border border-purple-200 focus:border-[#6C5CE7] focus:ring-2 focus:ring-purple-100 rounded-2xl p-4 text-sm text-gray-800 leading-relaxed transition-all outline-none resize-none"
        />
        <Pencil size={16} className="absolute left-3 top-3 text-[#6C5CE7] opacity-100 peer-focus:opacity-0 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
}