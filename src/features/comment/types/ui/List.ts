import type { Comment } from "../comment/Comment";

export type ListProps = {
  comments?: Comment[];
  currentUserId?: number;
  onEdit: (id: number, text: string) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
  onLoadMore?: () => void; // دالة جلب المزيد
  loadingMore?: boolean;   // حالة التحميل لإيقاف التكرار
};