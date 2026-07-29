import { Bookmark } from "lucide-react";
import TabEmptyState from "./TabEmptyState";

// لاحقاً ستضيف هنا: const { data } = useFetchVaultProjects();
export default function VaultTab() {
  return (
    <div className="p-6">
      <TabEmptyState
        icon={<Bookmark size={32} />}
        title="الخزنة"
        description="لا توجد منشورات أو عناصر محفوظة في الخزنة حالياً."
      />
    </div>
  );
}