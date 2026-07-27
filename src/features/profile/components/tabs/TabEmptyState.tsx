import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function TabEmptyState({ icon, title, description }: Props) {
  return (
    <div className="py-24 px-8 flex flex-col items-center justify-center text-center space-y-4 bg-[#FAF8FF] rounded-3xl border-2 border-dashed border-purple-200/80 w-full min-h-[500px]">
      <div className="w-20 h-20 rounded-full bg-purple-100/70 text-[#6C5CE7] flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-2 max-w-md">
        <h3 className="font-extrabold text-gray-900 text-lg">
          لا توجد بيانات متاحة في {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}