import { Label } from "flowbite-react";
import type { Radio } from "../../types/ui/Radio";

export function RadioGroup({
  label,
  value,
  onChange,
  options,
}: Radio) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className="text-gray-900 font-semibold">
          {label}
        </Label>
      )}

      <div className="flex gap-6 items-center">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              id={option.value}
              name="role"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-5 w-5 border-2 border-purple-700 text-purple-600 focus:ring-purple-500 cursor-pointer"
            />

            <label
              htmlFor={option.value}
              className="text-gray-700 cursor-pointer select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}