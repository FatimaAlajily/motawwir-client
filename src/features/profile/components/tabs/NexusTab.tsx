import { Newspaper } from "lucide-react";
import TabEmptyState from "./TabEmptyState";

// لاحقاً ستضيف هنا: const { data } = useFetchNexusPosts();
export default function NexusTab() {
  return (
    <div className="p-6">
      <TabEmptyState
        icon={<Newspaper size={32} />}
        title="آخر المنشورات"
        description="لا توجد منشورات خاصة بالمستخدم حالياً."
      />
    </div>
  );
}