import type { FormInputProps } from "../../types/forms/FormInputProps";

export const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: FormInputProps) => (
  <div className="flex flex-col gap-1.5 " style={{ font: "Tajawal" }}>
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7f26fa62] text-sm"
    />
  </div>
);
