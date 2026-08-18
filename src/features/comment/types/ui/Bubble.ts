import type { ReactNode } from "react";

export type BubbleProps = {
  userName: string;
  createdAt: string;
  children: ReactNode;
  actions?: ReactNode;
};