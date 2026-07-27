import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ProfileCard({ children, className = "" }: Props) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-gray-100
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}