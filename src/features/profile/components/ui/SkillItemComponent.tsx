import { X } from "lucide-react";
import type { SkillItem } from "../../types/ui/SkillItem";

export function SkillItemComponent({ name, onRemove }: SkillItem) {
  return (
    <span className="bg-[#6C5CE7] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2">
      <span>{name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="hover:bg-purple-800 text-purple-200 hover:text-white rounded-full p-0.5 transition-colors"
      >
        <X size={13} />
      </button>
    </span>
  );
}