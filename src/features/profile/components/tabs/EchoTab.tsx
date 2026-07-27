import { MessageSquare } from "lucide-react";
import TabEmptyState from "./TabEmptyState";

// لاحقاً ستضيف هنا: const { data } = useFetchEchoMessages();
export default function EchoTab() {
  return (
    <div className="p-6">
      <TabEmptyState
        icon={<MessageSquare size={32} />}
        title="جدار الصدى"
        description="لا توجد رسائل على جدار الصدى حالياً."
      />
    </div>
  );
}