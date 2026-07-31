import type { ReactNode } from "react";

export type InfoRow = {
  icon: ReactNode;
  text: string;
  href?: string;
  truncate?: boolean;
};