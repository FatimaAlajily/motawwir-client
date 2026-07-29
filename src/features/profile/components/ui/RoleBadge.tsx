import type { RoleBadge } from "../../types/ui/RoleBadge";

export function RoleBadge({ role }: RoleBadge) {
  return (
    <p className="font-semibold mt-1 flex items-center gap-2" style={{ color: "#000000", fontSize: "16px" }}>
      <span>{role}</span>
      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
    </p>
  );
}