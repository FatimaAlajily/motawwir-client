// ← احذف هذا السطر بالكامل إذا كان موجوداً: import type { TabType } from "./ProfileTabs";

export type TabType = "echo" | "nexus" | "vault";

const tabs: { id: TabType; label: string }[] = [
  { id: "echo", label: "جدار الصدى" },
  { id: "nexus", label: "منشوراتي" },
  { id: "vault", label: "الخزنة" },
];

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="px-6 pt-6">
      <div className="border-b border-gray-100 flex gap-8 text-sm md:text-base font-medium justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-[#6C5CE7] text-[#6C5CE7] font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}