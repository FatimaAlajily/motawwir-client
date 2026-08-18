import type { RoleBadge } from "../../types/ui/RoleBadge";

export function RoleBadge({ role }: RoleBadge) {
  // دالة لتحديد اللون بناءً على نوع الدور باستخدام الأكواد المحددة
  const getRoleColor = (currentRole: string) => {
    switch (currentRole.toLowerCase()) {
      case "مطور":
      case "developer":
        return "#502290"; // لون المطور
      case "شركة":
      case "company":
        return "#38FFFF"; // لون الشركة
      case "عميل":
      case "client":
        return "#61A343"; // لون العميل
      default:
        return "#EF4444"; // اللون الافتراضي في حال لم يتطابق أي دور
    }
  };

  return (
    <p className="font-semibold mt-1 flex items-center gap-2" style={{ color: "#000000", fontSize: "16px" }}>
      <span>{role}</span>
      <span 
        className="w-2.5 h-2.5 rounded-full inline-block" 
        style={{ backgroundColor: getRoleColor(role) }}
      />
    </p>
  );
}