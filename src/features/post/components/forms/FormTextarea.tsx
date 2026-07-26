import type { FormTextareaProps } from "../../types/forms/FormTextareaProps";

export const FormTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
}: FormTextareaProps) => (
  <div className="flex flex-col gap-1.5" style={{ font: "Tajawal" }}>
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7f26fa62] text-sm resize-none"
    />
  </div>
);
