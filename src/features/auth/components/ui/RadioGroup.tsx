import { Label } from "flowbite-react";
import type { Radio } from "../../types/ui/Radio";


export function RadioGroup({
  label,
  value,
  onChange,
  options,
}: Radio) {
  
  // دالة لتحديد اللون الخاص بكل دور بناءً على الـ value أو الـ label
  const getRoleHexColor = (roleValue: string, roleLabel: string) => {
    const textToCheck = (roleValue + " " + roleLabel).toLowerCase();
    
    if (textToCheck.includes("عميل") || textToCheck.includes("client")) {
      return "#61A343"; // أخضر للعميل
    }
    if (textToCheck.includes("مطور") || textToCheck.includes("developer")) {
      return "#502290"; // بنفسجي للمطور
    }
    if (textToCheck.includes("شركة") || textToCheck.includes("company")) {
      return "#38FFFF"; // سماوي للشركة
    }
    return "#6C5CE7"; // اللون الافتراضي
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className="text-white font-semibold">
          {label}
        </Label>
      )}

      <div className="flex gap-6 items-center">
        {options.map((option) => {
          const roleColor = getRoleHexColor(option.value, option.label);
          const isChecked = value === option.value;

          return (
            <div
              key={option.value}
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => onChange(option.value)}
            >
              {/* الدائرة المخصصة الملونة */}
              <div 
                className="relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                style={{ borderColor: roleColor }}
              >
                {isChecked && (
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: roleColor }} 
                  />
                )}
              </div>

              <input
                type="radio"
                id={option.value}
                name="role"
                value={option.value}
                checked={isChecked}
                onChange={() => onChange(option.value)}
                className="hidden"
              />

              {/* عرض النص (مطور، شركة، عميل) بجانب الدائرة */}
              <label
                htmlFor={option.value}
               className={`cursor-pointer select-none font-medium text-base ${isChecked ? 'text-gray-900 font-bold' : 'text-gray-700'}`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}