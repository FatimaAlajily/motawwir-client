import { useState } from "react";
import { X } from "lucide-react";
import type { SkillsInputProps } from "../../types/fields/SkillsInputProps";

export const SkillsInput = ({
  label = "المهارات",
  value,
  onChange,
}: SkillsInputProps) => {
  const [draft, setDraft] = useState("");

  function addSkill() {
    // لو كان فاضي او القيمة نفسها متكررة متضيفش
    const trimmed = draft.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setDraft("");
  }

  function removeSkill(skill: string) {
    onChange(value.filter((s) => s !== skill));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className="flex flex-col gap-1.5" style={{ font: "Tajawal" }}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-xl">
        {value.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 bg-[#e5e5f8] text-[#4b1e8a] text-xs font-semibold px-3 py-1 rounded-full"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-red-600"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addSkill}
          placeholder="اكتب مهارة واضغط Enter أو  ,"
          className="flex-1 min-w-30 px-2 py-1 text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};
