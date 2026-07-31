import type { SidebarSection } from "../../types/ui/SidebarSection";

export function SidebarSection({ title, children }: SidebarSection) {
  return (
    <div className="p-5 space-y-3.5 text-xs text-right">
      <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
      {children}
    </div>
  );
}